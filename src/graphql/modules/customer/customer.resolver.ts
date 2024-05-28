import { ROLES } from "../../../constants/role.const";
import { Context } from "../../../core/context";
import { onActivity } from "../../../events/onActivity.event";
import { ActivityTypes, ChangedFactors } from "../activity/activity.model";
import { CustomerLoader, CustomerModel } from "./customer.model";
import { customerService } from "./customer.service";

const Query = {
  getAllCustomer: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    return customerService.fetch(args.q);
  },
  getOneCustomer: async (root: any, args: any, context: Context) => {
    // context.auth([ROLES.ADMIN]);
    const { id } = args;
    return await customerService.findOne({ _id: id });
  },
};

const Mutation = {
  updateCustomer: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    const { id, data } = args;
    return await customerService.updateOne(id, data).then((res) => {
      onActivity.next({
        userId: context.id,
        factorId: id,
        type: ActivityTypes.UPDATE,
        changedFactor: ChangedFactors.CUSTOMER,
      });
      return res;
    });
  },
  deleteOneCustomer: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    const { id } = args;
    return await customerService.deleteOne(id).then((res) => {
      onActivity.next({
        userId: context.id,
        factorId: id,
        type: ActivityTypes.DELETE,
        changedFactor: ChangedFactors.CUSTOMER,
      });
      return res;
    });
  },
};

const Customer = {};

export default {
  Query,
  Mutation,
  Customer,
};
