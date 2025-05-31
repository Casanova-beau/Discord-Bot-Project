const { EmbedBuilder } = require("discord.js");

const stats = new Map();

module.exports = {
  name: "roll",
  description: "Roll a dice (1-6) and track your stats!",
  callback: async (client, interaction) => {
    const userId = interaction.user.id;
    const roll = Math.floor(Math.random() * 6) + 1;

    let userStats = stats.get(userId) || { highest: 0, total: 0 };
    userStats.total += 1;
    if (roll > userStats.highest) userStats.highest = roll;
    stats.set(userId, userStats);

    const embed = new EmbedBuilder()
      .setColor(0x2ecc71)
      .setTitle("🎲 Dice Roll")
      .setDescription(`You rolled a **${roll}**!`)
      .addFields(
        { name: "Highest Roll", value: `${userStats.highest}`, inline: true },
        { name: "Total Rolls", value: `${userStats.total}`, inline: true }
      );
    return interaction.reply({ embeds: [embed] });
  },
};
