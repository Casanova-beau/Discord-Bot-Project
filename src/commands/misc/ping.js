const { EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Pong!",
  testOnly: true,

  callback: (client, interaction) => {
    try {
      const embed = new EmbedBuilder()
        .setColor(0x00ff99)
        .setTitle("🏓 Pong!")
        .setDescription(`WebSocket Ping: **${client.ws.ping}ms**`)
        .setTimestamp()
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({
        embeds: [embed],
        // No flags here, so it's public
      });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("❌ Error")
        .setDescription("An error occurred while processing your command.");

      interaction.reply({
        embeds: [errorEmbed],
        flags: MessageFlags.Ephemeral, // Only ephemeral on error
      });
    }
  },

  prefixCallback: (client, message, args) => {
    try {
      const embed = new EmbedBuilder()
        .setColor(0x00ff99)
        .setTitle("🏓 Pong!")
        .setDescription(`WebSocket Ping: **${client.ws.ping}ms**`)
        .setTimestamp()
        .setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL(),
        });
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("❌ Error")
        .setDescription("An error occurred while processing your command.");
      message.reply({
        embeds: [errorEmbed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
