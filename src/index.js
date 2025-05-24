require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

bot.on("ready", (b) => {
  console.log(`✅ Logged in as ${b.user.username}!`);
});

bot.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === "?ping") {
    message.reply("Pong!");
  }
});

bot.on('interactionCreate' , async (interaction) => {
if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else {
    await interaction.reply({ content: 'Unknown command', ephemeral: true });
  }

})

bot.login(process.env.TOKEN).catch((err) => {
  console.error("❌ Failed to login:", err);
  process.exit(1);
}
);