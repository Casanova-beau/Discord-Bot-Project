const getLocalCommands = require("../../utils/getLocalCommands");
const { EmbedBuilder } = require("discord.js");

const PREFIX = "!";

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const localCommands = getLocalCommands();
  const commandObject = localCommands.find(
    (cmd) =>
      cmd.name === commandName ||
      (Array.isArray(cmd.aliases) && cmd.aliases.includes(commandName))
  );

  if (!commandObject) return;

  try {
    if (typeof commandObject.prefixCallback === "function") {
      await commandObject.prefixCallback(client, message, args);
    } else if (typeof commandObject.callback === "function") {
      await commandObject.callback(client, message, args);
    } else {
      message.reply("⚠️ This command is not properly configured.");
    }
  } catch (error) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("❌ Command Error")
      .setDescription("There was an error running this command.");
    message.reply({ embeds: [embed] });
    console.error(`Prefix command error:`, error);
  }
};
