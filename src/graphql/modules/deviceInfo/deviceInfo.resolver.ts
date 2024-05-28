
import { Context } from "../../../core/context";
import { GraphLoader } from "../../../core/loader";
import { UserLoader } from "../user/user.model";
import { deviceInfoService } from "./deviceInfo.service";

const Query = {
  getAllDeviceInfo: async (root: any, args: any, context: Context) => {
    context.auth([]);
    return deviceInfoService.fetch(args.q);
  },
  getOneDeviceInfo: async (root: any, args: any, context: Context) => {
    context.auth([]);
    const { id } = args;
    return await deviceInfoService.findOne({ _id: id });
  },
};

const Mutation = {
  createDeviceInfo: async (root: any, args: any, context: Context) => {
    context.auth([]);
    const { data } = args;
    return await deviceInfoService.create(data);
  },
  updateDeviceInfo: async (root: any, args: any, context: Context) => {
    context.auth([]);
    const { id, data } = args;
    return await deviceInfoService.updateOne(id, data);
  },
  deleteOneDeviceInfo: async (root: any, args: any, context: Context) => {
    context.auth([]);
    const { id } = args;
    return await deviceInfoService.deleteOne(id);
  },
  deleteManyDeviceInfo: async (root: any, args: any, context: Context) => {
    context.auth([]);
    const { ids } = args;
    let result = await deviceInfoService.deleteMany(ids);
    return result;
  },
};

const DeviceInfo = {
  user: GraphLoader.loadById(UserLoader, "userId"),
};

export default {
  Query,
  Mutation,
  DeviceInfo,
};
