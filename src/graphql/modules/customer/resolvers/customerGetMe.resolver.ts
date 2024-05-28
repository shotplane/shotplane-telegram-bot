import { ROLES } from "../../../../constants/role.const";
import { Context } from "../../../../core/context";
import { ErrorHelper } from "../../../../helpers";
import { CustomerModel, CustomerStatus } from "../customer.model";

const Query = {
  customerGetMe: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.CUSTOMER]);

    // console.log("context.id", context.id);
    const customer = await CustomerModel.findById(context.id);

    if (!customer) {
      throw ErrorHelper.unauthorized();
    }

    if (customer.status === CustomerStatus.DEACTIVED) {
      throw ErrorHelper.permissionDeny();
    }

    // await CustomerHelper.setAccessTimes(customer);

    return customer;
  },
};

export default {
  Query,
};
