import { ROLES } from "../../../constants/role.const";
import { settingGroupService } from "./settingGroup.service";
import { SettingModel } from "../setting/setting.model";
import { Context } from "../../../core/context";

const Query = {
  getAllSettingGroup: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    return settingGroupService.fetch(args.q);
  },
  getOneSettingGroup: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    const { id } = args;
    return await settingGroupService.findOne({ _id: id });
  },
};

const Mutation = {
  createSettingGroup: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    const { data } = args;
    return await settingGroupService.create(data);
  },
  updateSettingGroup: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    const { id, data } = args;
    return await settingGroupService.updateOne(id, data);
  },
  deleteOneSettingGroup: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    const { id } = args;
    return await settingGroupService.deleteOne(id);
  },
  deleteManySettingGroup: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.ADMIN]);
    const { ids } = args;
    let result = await settingGroupService.deleteMany(ids);
    return result;
  },
};

const SettingGroup = {
  settings: async (root: any, args: any, context: Context) => {
    return await SettingModel.find({ groupId: root["id"] });
  },
};

export default {
  Query,
  Mutation,
  SettingGroup,
};
