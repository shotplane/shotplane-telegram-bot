import { Subject } from "rxjs";
import { Activity } from "won-dto/entities/activity";
import { ActivityModel } from "../graphql/modules/activity/activity.model";
export const onActivity = new Subject<Activity>();

onActivity.subscribe((event) => {
  let userType = "ADMIN";
  event.message = `${userType} ${event.type} ${event.changedFactor} at id ${event.factorId}`;
  ActivityModel.create(event);
});
