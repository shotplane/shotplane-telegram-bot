import { SettingTypes } from "won-dto/entities/setting";

export enum SettingGroupSlug {
  COMMON = "COMMON",
  WEBSITE_SETTING = "WEBSITE_SETTING",
  USER_SETTING = "USER_SETTING",
  BLOCKCHAIN_SETTING = "BLOCKCHAIN_SETTING",
  CLAIM_SETTING = "CLAIM_SETTING",
}
export enum SettingKey {
  // Cấu hình chung
  TITLE = "TITLE",
  WEBSITE_DOMAIN = "WEBSITE_DOMAIN",
  API_DOMAIN = "API_DOMAIN",
  MEDIA_DOMAIN = "MEDIA_DOMAIN",
  LOGO_URL = "LOGO_URL",
  MAINTENANCE = "MAINTENANCE",

  // cấu hình website
  USE_MENU_CATEGORY = "USE_MENU_CATEGORY",
  ADMIN_MENU = "ADMIN_MENU",
  EDITOR_MENU = "EDITOR_MENU",
  MENU_CATEGORIES = "MENU_CATEGORIES",

  // cau hinh blockchain
  NONCE_CODE = "NONCE_CODE",
  GAS_FEE = "GAS_FEE",

  //Claim setting
  CLAIM_AVAILABLE_MIN_AMOUNT = "CLAIM_AVAILABLE_MIN_AMOUNT",
  CLAIM_AVAILABLE_MAX_AMOUNT = "CLAIM_AVAILABLE_MAX_AMOUNT",
  CLAIM_AVAILABLE_AMOUNT = "CLAIM_AVAILABLE_AMOUNT",
  CLAIM_INIT_REF_CODE = "CLAIM_INIT_REF_CODE",
  CLAIM_NEXT_TIME = "CLAIM_NEXT_TIME",
  CLAIM_REF_BONUS = "CLAIM_REF_BONUS",
}

export const SETTING_DATA = [
  {
    slug: SettingGroupSlug.COMMON,
    name: "Common setting",
    desc: "Common setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingTypes.string,
        name: "Website Title",
        key: SettingKey.TITLE,
        value: `website.io`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingTypes.string,
        name: "Website Domain",
        key: SettingKey.WEBSITE_DOMAIN,
        value: `http://website.io/`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingTypes.string,
        name: "API Domain",
        key: SettingKey.API_DOMAIN,
        value: `https://core.website.io/`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingTypes.string,
        name: "Media Domain",
        key: SettingKey.MEDIA_DOMAIN,
        value: `https://core.website.io/`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingTypes.string,
        name: "Logo url",
        key: SettingKey.LOGO_URL,
        value: `/images/logo.png`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingTypes.boolean,
        name: "Maintenance",
        key: SettingKey.MAINTENANCE,
        value: false,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.WEBSITE_SETTING,
    name: "Website setting",
    desc: "Website setting here",
    icon: "far fa-tachometer-alt",
    readOnly: false,
    settings: [
      {
        type: SettingTypes.boolean,
        name: "Use menu category",
        key: SettingKey.USE_MENU_CATEGORY,
        value: true,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.BLOCKCHAIN_SETTING,
    name: "Blockchain setting",
    desc: "Blockchain setting here",
    icon: "far fa-tachometer-alt",
    readOnly: false,
    settings: [
      {
        type: SettingTypes.string,
        name: "Nonce message",
        key: SettingKey.NONCE_CODE,
        value: "Nonce Cat: 001231423",
        isActive: true,
        isPrivate: false,
        readOnly: false,
      }
    ],
  },
];
