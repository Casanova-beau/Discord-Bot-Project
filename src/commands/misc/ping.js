const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Pong!",
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

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

    interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
