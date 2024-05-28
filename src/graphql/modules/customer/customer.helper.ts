import { ROLES } from "../../../constants/role.const";
import { Context } from "../../../core/context";
import { ErrorHelper, KeycodeHelper } from "../../../helpers";
import { TokenHelper } from "../../../helpers/token.helper";
import { counterService } from "../counter/counter.service";
import { CustomerModel, CustomerStatus, ICustomer } from "./customer.model";

export class CustomerHelper {
  constructor(public customer: ICustomer) {}

  static async fromContext(context: Context) {
    if (!ROLES.CUSTOMER.includes(context.tokenData.role)) return null;
    const customer = await CustomerModel.findById(context.tokenData._id);
    if (!customer) throw ErrorHelper.permissionDeny();
    return new CustomerHelper(customer);
  }

  setActivedAt() {
    if (this.customer.status === CustomerStatus.ACTIVE && !this.customer.activedAt) {
      this.customer.activedAt = new Date();
    }
    return this;
  }

  static generateCode() {
    return counterService.trigger("user").then((c) => "U" + c);
  }

  static async generateReferalCode(secret: string) {
    let referral = KeycodeHelper.alpha(secret, 5);
    let countCode = await CustomerModel.countDocuments({ referral });
    while (countCode > 0) {
      referral = KeycodeHelper.alpha(secret, 5);
      countCode = await CustomerModel.countDocuments({ referral });
    }
    return referral;
  }

  static async generateNonce(secret: string) {
    let nonce = KeycodeHelper.alpha(secret, 10);
    let countCode = await CustomerModel.countDocuments({ nonce });
    while (countCode > 0) {
      nonce = KeycodeHelper.alpha(secret, 10);
      countCode = await CustomerModel.countDocuments({ nonce });
    }
    return nonce;
  }


  static async validContextAsCustomer(customerId: string) {
    const customer = await CustomerModel.findById(customerId);
    return this.validCustomer(customer);
  }

  static async validCustomer(customer: ICustomer) {
    if (!customer) {
      throw ErrorHelper.unauthorized();
    }

    if (customer.status === CustomerStatus.DEACTIVED) {
      throw ErrorHelper.permissionDeny();
    }

    return customer;
  }


  getToken() {
    return TokenHelper.generateToken({
      role: this.customer.role,
      _id: this.customer._id,
      username: this.customer.username,
      status: this.customer.status,
    });
  }
}
