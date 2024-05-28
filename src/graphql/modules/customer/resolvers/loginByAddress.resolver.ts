import { ROLES } from "../../../../constants/role.const";
import { encryptionHelper, ErrorHelper } from "../../../../helpers";
import { CustomerHelper } from "../customer.helper";
import { Customer, CustomerModel, CustomerStatus, customerWalletTypeData } from "../customer.model";
import Web3 from "web3";
import { onActivity } from "../../../../events/onActivity.event";
import { ActivityTypes, ChangedFactors } from "../../activity/activity.model";
import { Context } from "../../../../core/context";

const Mutation = {
  loginByAddress: async (root: any, args: any, context: Context) => {
    let { address, addressIp } = args;

    // if (!customerWalletTypeData.includes(walletType)) {
    //   throw ErrorHelper.requestDataInvalid("Wallet type");
    // }

    if (!addressIp) {
      throw ErrorHelper.permissionDeny();
    }

    if (!Web3.utils.isAddress(address)) {
      throw ErrorHelper.requestDataInvalid("Address");
    }

    let customer = await CustomerModel.findOne({ address });

    if (customer) {
      if (customer.status === CustomerStatus.DEACTIVED) {
        throw ErrorHelper.permissionDeny();
      }

      onActivity.next({
        customerId: customer.id,
        factorId: customer.id,
        type: ActivityTypes.CUSTOMER_SIGNIN,
        changedFactor: ChangedFactors.CUSTOMER,
      });
    } else {
      const data: Customer = {
        address,
        activedAt: new Date(),
        role: ROLES.CUSTOMER,
        addressIp,
        nonce: await CustomerHelper.generateNonce(address),
        referral: await CustomerHelper.generateReferalCode(address),
      };

      customer = await CustomerModel.create(data);

      onActivity.next({
        customerId: customer.id,
        factorId: customer.id,
        type: ActivityTypes.CUSTOMER_REGISTER,
        changedFactor: ChangedFactors.CUSTOMER,
      });
    }

    return {
      customer,
      token: new CustomerHelper(customer).getToken(),
    };
  },
};

export default { Mutation };
