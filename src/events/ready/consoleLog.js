const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1377736955902693496"; // Replace with your log channel ID

module.exports = async (client) => {
  console.log(`${client.user.tag} is online!`);

  const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
  if (channel && channel.isTextBased()) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff99)
      .setTitle("✅ Bot Online")
      .setDescription(`${client.user} is now online and ready!`)
      .setTimestamp();

    channel.send({ embeds: [embed] }).catch(() => {});
  }
};
