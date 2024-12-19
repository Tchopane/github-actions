const core = require("@actions/core");
const { ECS } = require("@aws-sdk/client-ecs");
const runEcsTask = require("./runEcsTask")

async function run() {
  try {
    const cluster = core.getInput("cluster", { required: true });
    const serviceName = core.getInput("service", { required: true });
    const definedContainerName = core.getInput("container", { required: false });
    const command = core.getInput("command", { required: true });
    const givenTaskDefinition = core.getInput("task-definition", { required: false });
    const waitForCompletion = core.getInput("wait-for-completion", { required: false });
    const showRawOutput = core.getInput("show-raw-output", { required: false });
    const launchType = core.getInput("launch-type", { required: false });

    const ecs = new ECS();

    await runEcsTask({
      ecs,
      cluster,
      serviceName,
      definedContainerName,
      command,
      givenTaskDefinition,
      waitForCompletion,
      showRawOutput,
      launchType
    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

if (require.main === module) {
  run();
}
