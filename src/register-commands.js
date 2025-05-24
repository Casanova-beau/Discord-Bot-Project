require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

async () => {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log("🔄 Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("✅ Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("❌ Failed to reload application (/) commands:", error);
  }
};
