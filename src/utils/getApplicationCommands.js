module.exports = async (client, guildId) => {
  try {
    let applicationCommands;

    if (guildId) {
      const guild = await client.guilds.fetch(guildId);
      applicationCommands = guild.commands;
    } else {
      applicationCommands = client.application.commands;
    }

    await applicationCommands.fetch(); // Ensure commands are up-to-date
    return applicationCommands;
  } catch (error) {
    console.error("❌ Error fetching application commands:", error.message);
    return null;
  }
};
