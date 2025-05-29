const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions = []) => {
  let localCommands = [];
  const seenNames = new Set();

  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      let commandObject;
      try {
        commandObject = require(commandFile);
      } catch (error) {
        console.warn(
          `⚠️ Could not load command file: ${commandFile}\n${error.message}`
        );
        continue;
      }

      if (!commandObject || !commandObject.name) {
        console.warn(
          `⚠️ Skipping invalid command file (missing name): ${commandFile}`
        );
        continue;
      }

      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      if (seenNames.has(commandObject.name)) {
        console.warn(
          `⚠️ Duplicate command name detected: ${commandObject.name} (${commandFile})`
        );
        continue;
      }

      seenNames.add(commandObject.name);
      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
