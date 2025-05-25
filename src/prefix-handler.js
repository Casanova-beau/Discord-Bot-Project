const { evaluate } = require("mathjs");
const PREFIX = "!"; // Change this to your desired prefix

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
      message.reply("Pong!");
    }

    if (command === "calc" || command === "calculate") {
      if (args.length === 0) {
        return message.channel.send("Please provide a math expression to calculate.\nExample: `!calc 2 * (3 + 4)`");
      }
      const expression = args.join(" ");
      try {
        const result = evaluate(expression);
        message.reply(`Result: \`${result}\``);
      } catch (err) {
        message.channel.send("Invalid expression. Please enter a valid math expression.");
      }
    }
    // Add more commands here
  });
};