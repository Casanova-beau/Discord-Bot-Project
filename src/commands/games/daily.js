const { EmbedBuilder } = require("discord.js");

// Simple in-memory storage for demonstration (replace with a real DB in production)
const lastClaim = new Map();
const balances = new Map();

const DAILY_AMOUNT = 500;
const COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours in ms

module.exports = {
  name: "daily",
  description: "Claim your daily reward!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: [],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const userId = interaction.user.id;
    const now = Date.now();
    const last = lastClaim.get(userId) || 0;

    if (now - last < COOLDOWN) {
      const remaining = COOLDOWN - (now - last);
      const hours = Math.floor(remaining / (60 * 60 * 1000));
      const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

      const embed = new EmbedBuilder()
        .setColor(0xffcc00)
        .setTitle("⏳ Daily Already Claimed")
        .setDescription(
          `You can claim your next daily reward in **${hours}h ${minutes}m ${seconds}s**.`
        );

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // Update last claim time and balance
    lastClaim.set(userId, now);
    const newBalance = (balances.get(userId) || 0) + DAILY_AMOUNT;
    balances.set(userId, newBalance);

    const embed = new EmbedBuilder()
      .setColor(0x00ff99)
      .setTitle("🎉 Daily Reward Claimed!")
      .setDescription(
        `You received **${DAILY_AMOUNT} coins**!\nYour new balance is **${newBalance} coins**.`
      )
      .setFooter({ text: `Come back in 24 hours for more!` })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
