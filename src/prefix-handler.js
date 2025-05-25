const PREFIX = "!"; // Change this to your desired prefix

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    // Ignore messages from bots or without the prefix
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    // Remove prefix and split command/args
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
      message.reply("Pong!");
    }
    // Add more commands here
  });
};