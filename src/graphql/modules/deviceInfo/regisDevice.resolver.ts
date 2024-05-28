import { ROLES } from "../../../constants/role.const";
import { Context } from "../../../core/context";
import { ErrorHelper } from "../../../helpers";
import { DeviceInfoModel } from "./deviceInfo.model";

const Mutation = {
  regisDevice: async (root: any, args: any, context: Context) => {
    context.auth( ROLES.ADMIN_EDITOR); // Cấp quyền
    const { deviceToken, deviceId } = args;

    const device = await DeviceInfoModel.findOne({ userId: context.tokenData._id });
    if (!device) {
      throw ErrorHelper.unauthorized();
    }

    return DeviceInfoModel.findByIdAndUpdate(
      device.id,
      { $set: { deviceId: deviceId, deviceToken: deviceToken } },
      { upsert: true, new: true }
    )
      .exec()
      .then((res) => {
        // onActivity.next({
        //   id: context.id,
        //   message: `Người dùng đăng ký thiết bị ${res.deviceId}`,
        // });
        return res;
      });
  },
};
export default { Mutation };
