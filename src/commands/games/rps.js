const { EmbedBuilder } = require("discord.js");

const stats = new Map();
const choices = ["Rock", "Paper", "Scissors"];

module.exports = {
  name: "rps",
  description: "Play Rock, Paper, Scissors against the bot!",
  options: [
    {
      name: "move",
      type: 3, // STRING
      description: "Your move",
      required: true,
      choices: choices.map((c) => ({ name: c, value: c })),
    },
  ],
  callback: async (client, interaction) => {
    const userId = interaction.user.id;
    const userMove = interaction.options.getString("move");
    const botMove = choices[Math.floor(Math.random() * choices.length)];

    let userStats = stats.get(userId) || {
      wins: 0,
      losses: 0,
      draws: 0,
      plays: 0,
    };
    userStats.plays += 1;

    let result;
    if (userMove === botMove) {
      result = "Draw";
      userStats.draws += 1;
    } else if (
      (userMove === "Rock" && botMove === "Scissors") ||
      (userMove === "Paper" && botMove === "Rock") ||
      (userMove === "Scissors" && botMove === "Paper")
    ) {
      result = "Win";
      userStats.wins += 1;
    } else {
      result = "Lose";
      userStats.losses += 1;
    }
    stats.set(userId, userStats);

    const embed = new EmbedBuilder()
      .setColor(
        result === "Win" ? 0x2ecc71 : result === "Draw" ? 0xf1c40f : 0xe74c3c
      )
      .setTitle("✊🖐✌ Rock, Paper, Scissors")
      .setDescription(`You chose **${userMove}**.\nBot chose **${botMove}**.`)
      .addFields(
        { name: "Result", value: result, inline: true },
        { name: "Wins", value: `${userStats.wins}`, inline: true },
        { name: "Losses", value: `${userStats.losses}`, inline: true },
        { name: "Draws", value: `${userStats.draws}`, inline: true },
        { name: "Total Plays", value: `${userStats.plays}`, inline: true }
      );
    return interaction.reply({ embeds: [embed] });
  },
};
