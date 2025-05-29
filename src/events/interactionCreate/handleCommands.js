const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    // Dev only check
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        const embed = new EmbedBuilder()
          .setColor(0xffcc00)
          .setTitle("🚫 Developer Only")
          .setDescription("Only developers are allowed to run this command.");
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    }

    // Test server only check
    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        const embed = new EmbedBuilder()
          .setColor(0xffcc00)
          .setTitle("🚫 Test Server Only")
          .setDescription("This command cannot be run here.");
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    }

    // User permissions check
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle("❌ Insufficient Permissions")
            .setDescription(
              "You do not have the required permissions to run this command."
            );
          await interaction.reply({ embeds: [embed], ephemeral: true });
          return;
        }
      }
    }

    // Bot permissions check
    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (!bot.permissions.has(permission)) {
          const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle("❌ Bot Lacks Permissions")
            .setDescription(
              "I don't have enough permissions to run this command."
            );
          await interaction.reply({ embeds: [embed], ephemeral: true });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("❌ Command Error")
      .setDescription("There was an error running this command.");
    await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch(() => {});
    console.log(`There was an error running this command: ${error}`);
  }
};
