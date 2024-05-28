import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  DEACTIVED = "DEACTIVED",
}

export enum CustomerWalletType {
  METAMASK = "METAMASK",
  C98 = "C98",
  MATH = "MATH",
  BINANCE_CHAIN = "BINANCE_CHAIN",
  BITKEEP = "BITKEEP",
  WALLETCONNECT = "WALLETCONNECT",
  COINBASE = "COINBASE",
}

export const customerWalletTypeData = [
  "METAMASK",
  "TRUST",
  "MATH",
  "WALLETCONNECT",
  "BINANCE_CHAIN",
  "COINBASE",
  "BITKEEP",
];

export type Customer = {
  username?: string;
  address?: string;

  referral?: string;
  shortUrl?: string;
  activedAt?: Date;
  role?: string;
  nonce?: string;
  addressIp?: string; // address

  bannerUrl?: string;
  avatarUrl?: string;

  walletType?: CustomerWalletType;
  status?: CustomerStatus;
};

export type ICustomer = BaseDocument & Customer;

const customerSchema = new Schema(
  {
    username: { type: String },
    address: { type: String }, // dia chi vi

    activedAt: { type: Date },
    referral: { type: String },
    shortUrl: { type: String },
    role: { type: String },
    nonce: { type: String },
    addressIp: { type: String },

    bannerUrl: { type: String, default: "/images/customer/banner.png" },
    avatarUrl: { type: String, default: "/images/customer/avatar.png" },

    walletType: { type: String, enum: CustomerWalletType },
    status: { type: String, enum: CustomerStatus, default: CustomerStatus.ACTIVE },
  },
  { timestamps: true }
);

customerSchema.index(
  { id: "text", address: "text", addressIp: "text" },
  { weights: { id: 1, address: 2, addressIp: 3 } }
);

export const CustomerHook = new ModelHook<ICustomer>(customerSchema);
export const CustomerModel: mongoose.Model<ICustomer> = MainConnection.model(
  "Customer",
  customerSchema
);

export const CustomerLoader = ModelLoader<ICustomer>(CustomerModel, CustomerHook);
