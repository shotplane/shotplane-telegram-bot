import { ROLES } from "../../../constants/role.const";
import { Context } from "../../../core/context";
import { DeviceInfoModel } from "./deviceInfo.model";

const Mutation = {
  unRegisDevice: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR); // Cấp quyền
    return DeviceInfoModel.findOneAndRemove({
      userId: context.tokenData._id,
      deviceId: args.deviceId,
    })
      .then((res) => {
        // onActivity.next({
        //   id: context.id,
        //   message: `Người dùng hủy đăng ký thiết bị ${res.deviceId}`,
        // });
        return true;
      })
      .catch((err) => false);
  },
};
export default { Mutation };
