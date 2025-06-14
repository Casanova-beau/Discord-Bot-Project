const { EmbedBuilder } = require("discord.js");

const stats = new Map();
const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐", "🔔"];

function scoreSpin(spin) {
  // 3 of a kind: 100, 2 of a kind: 10, all different: 1
  if (spin[0] === spin[1] && spin[1] === spin[2]) return 100;
  if (spin[0] === spin[1] || spin[1] === spin[2] || spin[0] === spin[2])
    return 10;
  return 1;
}

module.exports = {
  name: "slotsbattle",
  description: "Spin against the bot! Highest combo wins.",
  callback: async (client, interaction) => {
    const userId = interaction.user.id;
    const userSpin = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];
    const botSpin = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    let userStats = stats.get(userId) || {
      wins: 0,
      losses: 0,
      draws: 0,
      plays: 0,
    };
    userStats.plays += 1;

    const userScore = scoreSpin(userSpin);
    const botScore = scoreSpin(botSpin);

    let result;
    if (userScore > botScore) {
      result = "You Win!";
      userStats.wins += 1;
    } else if (userScore < botScore) {
      result = "You Lose!";
      userStats.losses += 1;
    } else {
      result = "Draw!";
      userStats.draws += 1;
    }
    stats.set(userId, userStats);

    const embed = new EmbedBuilder()
      .setColor(
        result === "You Win!"
          ? 0x2ecc71
          : result === "Draw!"
          ? 0xf1c40f
          : 0xe74c3c
      )
      .setTitle("🎰 Slots Battle")
      .addFields(
        {
          name: "Your Spin",
          value: `| ${userSpin.join(" | ")} |`,
          inline: true,
        },
        {
          name: "Bot's Spin",
          value: `| ${botSpin.join(" | ")} |`,
          inline: true,
        },
        { name: "Result", value: result, inline: false },
        { name: "Wins", value: `${userStats.wins}`, inline: true },
        { name: "Losses", value: `${userStats.losses}`, inline: true },
        { name: "Draws", value: `${userStats.draws}`, inline: true },
        { name: "Total Plays", value: `${userStats.plays}`, inline: true }
      );
    return interaction.reply({ embeds: [embed] });
  },
};
