const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    const summary = [];

    for (const localCommand of localCommands) {
      const { name, description, options = [], deleted } = localCommand;

      // Validate required fields
      if (!name || !description) {
        console.warn(
          `⚠️ Skipping command with missing name or description:`,
          localCommand
        );
        continue;
      }

      const existingCommand = applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          summary.push({ Command: name, Action: "Deleted" });
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`🔁 Edited command "${name}".`);
          summary.push({ Command: name, Action: "Edited" });
        } else {
          summary.push({ Command: name, Action: "No Change" });
        }
      } else {
        if (deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          summary.push({ Command: name, Action: "Skipped (Deleted)" });
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}".`);
        summary.push({ Command: name, Action: "Registered" });
      }
    }

    // Print summary table
    if (summary.length) {
      console.log("\nCommand Registration Summary:");
      console.table(summary);
    }
  } catch (error) {
    console.error(`❌ There was an error registering commands:`, error);
  }
};
