const { EmbedBuilder } = require("discord.js");

const stats = new Map();

module.exports = {
  name: "guessnumber",
  description: "Guess a number between 1 and 10!",
  options: [
    {
      name: "number",
      type: 4, // INTEGER
      description: "Your guess (1-10)",
      required: true,
      min_value: 1,
      max_value: 10,
    },
  ],
  callback: async (client, interaction) => {
    const userId = interaction.user.id;
    const guess = interaction.options.getInteger("number");
    const answer = Math.floor(Math.random() * 10) + 1;

    let userStats = stats.get(userId) || { wins: 0, losses: 0, plays: 0 };
    userStats.plays += 1;

    const win = guess === answer;
    if (win) userStats.wins += 1;
    else userStats.losses += 1;
    stats.set(userId, userStats);

    const embed = new EmbedBuilder()
      .setColor(win ? 0x2ecc71 : 0xe74c3c)
      .setTitle("🔢 Guess The Number")
      .setDescription(
        `You guessed **${guess}**.\nThe correct number was **${answer}**.`
      )
      .addFields(
        {
          name: win ? "You Win!" : "You Lose!",
          value: win ? "🎉" : "😢",
          inline: true,
        },
        { name: "Wins", value: `${userStats.wins}`, inline: true },
        { name: "Losses", value: `${userStats.losses}`, inline: true },
        { name: "Total Plays", value: `${userStats.plays}`, inline: true }
      );
    return interaction.reply({ embeds: [embed] });
  },
};
