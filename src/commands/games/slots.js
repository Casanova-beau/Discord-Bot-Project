const { EmbedBuilder } = require("discord.js");

const stats = new Map();
const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐", "🔔"];

module.exports = {
  name: "slots",
  description: "Spin the slot machine and try your luck!",
  callback: async (client, interaction) => {
    const userId = interaction.user.id;
    const spin = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    let userStats = stats.get(userId) || { wins: 0, losses: 0, plays: 0 };
    userStats.plays += 1;

    const win = spin[0] === spin[1] && spin[1] === spin[2];
    if (win) userStats.wins += 1;
    else userStats.losses += 1;
    stats.set(userId, userStats);

    const embed = new EmbedBuilder()
      .setColor(win ? 0x2ecc71 : 0xe74c3c)
      .setTitle("🎰 Slot Machine")
      .setDescription(`| ${spin.join(" | ")} |`)
      .addFields(
        {
          name: win ? "You Win!" : "You Lose!",
          value: win ? "🎉 Jackpot!" : "😢 Better luck next time!",
          inline: true,
        },
        { name: "Wins", value: `${userStats.wins}`, inline: true },
        { name: "Losses", value: `${userStats.losses}`, inline: true },
        { name: "Total Plays", value: `${userStats.plays}`, inline: true }
      );
    return interaction.reply({ embeds: [embed] });
  },
};
