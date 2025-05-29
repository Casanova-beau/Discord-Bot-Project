const { EmbedBuilder, ActivityType } = require("discord.js");

const CHANNEL_ID = "1377736955902693496";

module.exports = async (client) => {
  // Set streaming presence
  client.user.setPresence({
    activities: [
      {
        name: "My Owner Twitch Account!",
        type: ActivityType.Streaming,
        url: "https://www.twitch.tv/Casanova_beau",
      },
    ],
    status: "online",
  });

  console.log(`${client.user.tag} is online!`);

  const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
  if (channel && channel.isTextBased()) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff99)
      .setTitle("✅ Bot Online")
      .setDescription(`${client.user.tag} is now online and ready!`)
      .setTimestamp();

    channel.send({ embeds: [embed] }).catch(() => {});
  }
};
