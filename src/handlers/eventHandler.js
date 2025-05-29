const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
const { EmbedBuilder } = require("discord.js");

const LOG_CHANNEL_ID = "1377736955902693496"; // Optional: set to your log channel ID

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    client.on(eventName, async (...args) => {
      for (const eventFile of eventFiles) {
        try {
          const eventFunction = require(eventFile);
          if (typeof eventFunction === "function") {
            await eventFunction(client, ...args);
          } else {
            console.warn(`⚠️ Skipped ${eventFile}: Not a function export.`);
          }
        } catch (error) {
          console.error(
            `❌ Error in event "${eventName}" (${eventFile}):`,
            error
          );

          // Optional: Send error embed to a log channel
          if (LOG_CHANNEL_ID && client.channels.cache.has(LOG_CHANNEL_ID)) {
            const channel = client.channels.cache.get(LOG_CHANNEL_ID);
            if (channel && channel.isTextBased()) {
              const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle(`❌ Error in ${eventName}`)
                .setDescription(`\`\`\`${error.message}\`\`\``)
                .setTimestamp();
              channel.send({ embeds: [embed] }).catch(() => {});
            }
          }
        }
      }
    });
  }
};
