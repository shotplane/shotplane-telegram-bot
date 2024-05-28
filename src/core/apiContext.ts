import { Request } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import _ from "lodash";

import { ROLES } from "../constants/role.const";
import { TokenHelper } from "../helpers/token.helper";
import { ErrorHelper } from "./error";

export type TokenData = {
  role: string;
  _id: string;
  [name: string]: any;
};

export type SignedRequestPayload = {
  psid: string;
  algorithm: string;
  thread_type: string;
  tid: string;
  issued_at: number;
  page_id: number;
};

export class ApiContext {
  req: Request;
  isAuth = false;
  isTokenExpired = false;
  tokenData: TokenData;

  constructor(req: Request) {
    this.req = req;
    this.parseToken(req);
  }

  isAdmin() {
    return _.get(this.tokenData, "role") === ROLES.ADMIN;
  }
  isMember() {
    return _.get(this.tokenData, "role") === ROLES.MEMBER;
  }
  isCustomer() {
    return _.get(this.tokenData, "role") === ROLES.CUSTOMER;
  }
  get id() {
    return _.get(this.tokenData, "_id");
  }
  get userAgent() {
    return _.get(this.req.headers, "user-agent");
  }
  get ipAddress() {
    return _.get(this.req.headers, "x-forwarded-for") || _.get(this.req.headers, "remoteAddress");
  }


  parseToken(req: Request) {
    try {
      let token = null;

      if (req) {
        this.req = req;
        const bearer: any = _.get(req.headers, "authorization") || _.get(req.query, "authorization");
        token = bearer?.split(' ')?.[1];
      }

      if (token) {
        const decodedToken: any = TokenHelper.decodeToken(token);
        this.isAuth = true;
        this.tokenData = decodedToken;
      }
    } catch (err) {
      console.log("err", err);
      if (err instanceof TokenExpiredError) {
        this.isTokenExpired = true;
      }
      this.isAuth = false;
    }
  }

  auth(roles: String[]) {
    if (!this.isAuth) throw ErrorHelper.unauthorized();
    if (roles.indexOf(this.tokenData.role) !== -1) {
      return;
    } else {
      if (this.isTokenExpired) throw ErrorHelper.tokenExpired();
      throw ErrorHelper.permissionDeny();
    }
  }

  isOwner(_id: any) {
    if (this.isTokenExpired) {
      throw ErrorHelper.tokenExpired();
    }
    if (!this.isAuth) {
      throw ErrorHelper.unauthorized();
    }

    if (this.tokenData!._id.toString() != _id.toString()) {
      throw ErrorHelper.permissionDeny();
    }
  }
}

export async function onContext(params: any) {
  return new ApiContext(params);
}
