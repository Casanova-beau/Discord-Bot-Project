const { EmbedBuilder } = require("discord.js");

const responses = [
  "Yes.",
  "No.",
  "Maybe.",
  "Definitely!",
  "Absolutely not.",
  "Ask again later.",
  "I don't know.",
  "Without a doubt!",
];

module.exports = {
  name: "8ball",
  description: "Ask the magic 8-ball a question!",
  options: [
    {
      name: "question",
      type: 3, // STRING
      description: "Your question",
      required: true,
    },
  ],
  callback: async (client, interaction) => {
    const question = interaction.options.getString("question");
    const answer = responses[Math.floor(Math.random() * responses.length)];
    const embed = new EmbedBuilder()
      .setColor(0x8e44ad)
      .setTitle("🎱 Magic 8-Ball")
      .addFields(
        { name: "Question", value: question },
        { name: "Answer", value: answer }
      );
    return interaction.reply({ embeds: [embed] });
  },
};
