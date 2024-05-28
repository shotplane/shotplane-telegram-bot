import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export enum EventErrorTypeEnum {
  example_1 = "example_1",
  example_2 = "example_2",
}
export enum EventErrorStatusEnum {
  error = "error",
  resolved = "resolved",
}

export type IEventError = BaseDocument & {
  type?: EventErrorTypeEnum;
  errorStack?: string;
  errorName?: string;
  errorMessage?: string;
  data?: any;
  status?: EventErrorStatusEnum;
};

const eventErrorSchema = new Schema(
  {
    type: {
      type: String,
    },
    errorName: {
      type: String,
    },
    errorStack: {
      type: Schema.Types.Mixed,
    },
    errorMessage: {
      type: String,
    },
    data: {
      type: Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: Object.keys(EventErrorStatusEnum),
      default: EventErrorStatusEnum.error,
    },
  },
  { timestamps: true }
);

// eventErrorSchema.index({ name: "text" }, { weights: { name: 2 } });
export const EventErrorHook = new ModelHook<IEventError>(eventErrorSchema);
export const EventErrorModel: mongoose.Model<IEventError> = MainConnection.model(
  "EventError",
  eventErrorSchema
);
export const EventErrorLoader = ModelLoader<IEventError>(EventErrorModel, EventErrorHook);
