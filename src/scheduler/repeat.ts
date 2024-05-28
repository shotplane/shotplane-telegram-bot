import chalk from "chalk";
import HelloWorldJob from "./jobs/helloWorld.job";

export function InitRepeatJobs() {
  console.log(chalk.redBright("\n🚣 Generate Repeat Jobs"));

  HelloWorldJob.create({})
    .repeatEvery("30 seconds")
    .unique({ name: HelloWorldJob.jobName })
    .save();
}
