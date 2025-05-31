const { EmbedBuilder } = require("discord.js");

const stats = new Map();

module.exports = {
  name: "coinflip",
  description: "Flip a coin and try to guess the outcome!",
  options: [
    {
      name: "guess",
      type: 3, // STRING
      description: "Your guess: Heads or Tails",
      required: true,
      choices: [
        { name: "Heads", value: "Heads" },
        { name: "Tails", value: "Tails" },
      ],
    },
  ],
  callback: async (client, interaction) => {
    const userId = interaction.user.id;
    const guess = interaction.options.getString("guess");
    const result = Math.random() < 0.5 ? "Heads" : "Tails";

    // Get or initialize user stats
    let userStats = stats.get(userId) || { wins: 0, losses: 0, streak: 0 };
    let win = guess === result;

    if (win) {
      userStats.wins += 1;
      userStats.streak += 1;
    } else {
      userStats.losses += 1;
      userStats.streak = 0;
    }
    stats.set(userId, userStats);

    const embed = new EmbedBuilder()
      .setColor(win ? 0x2ecc71 : 0xe74c3c)
      .setTitle("🪙 Coin Flip")
      .setDescription(`You guessed **${guess}**.\nThe coin landed on **${result}**!`)
      .addFields(
        { name: win ? "You Win!" : "You Lose!", value: win ? "🎉" : "😢", inline: true },
        { name: "Wins", value: `${userStats.wins}`, inline: true },
        { name: "Losses", value: `${userStats.losses}`, inline: true },
        { name: "Current Streak", value: `${userStats.streak}`, inline: true }
      );
    return interaction.reply({ embeds: [embed] });
  },
};