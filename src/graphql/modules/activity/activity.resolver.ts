import { ROLES } from "../../../constants/role.const";
import { Context } from "../../../core/context";
import { GraphLoader } from "../../../core/loader";
import { CustomerLoader } from "../customer/customer.model";
import { UserLoader } from "../user/user.model";
import { activityService } from "./activity.service";

const Query = {
  getAllActivity: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    return activityService.fetch(args.q);
  },
  getOneActivity: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await activityService.findOne({ _id: id });
  },
};

const Mutation = {
  deleteOneActivity: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    const { id } = args;
    return await activityService.deleteOne(id);
  },
};

const Activity = {
  customer: GraphLoader.loadById(CustomerLoader, "customerId"),
  user: GraphLoader.loadById(UserLoader, "userId"),
};

export default {
  Query,
  Mutation,
  Activity,
};
