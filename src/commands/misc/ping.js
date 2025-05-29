const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Replies with Pong and shows the bot's latency.",
  callback: (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor(0x00ff99)
      .setTitle("🏓 Pong!")
      .setDescription(`WebSocket Ping: **${client.ws.ping}ms**`)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    interaction.reply({ embeds: [embed] });
  },
  prefixCallback: (client, message, args) => {
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
  },
};
