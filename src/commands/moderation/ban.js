const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  deleted: false,
  name: "ban",
  description: "Bans a member from the server.",
  // devOnly: Boolean,
  // testOnly: Boolean,
  options: [
    {
      name: "target-user",
      description: "The user to ban.",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "reason",
      description: "The reason for banning.",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.BanMembers],

  callback: async (client, interaction) => {
    const targetUser = interaction.options.getUser("target-user");
    const reason =
      interaction.options.getString("reason") || "No reason provided.";

    // Check if the user is in the guild
    const member = await interaction.guild.members
      .fetch(targetUser.id)
      .catch(() => null);

    if (!member) {
      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("❌ Ban Failed")
        .setDescription("User not found in this server.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // Prevent banning admins or yourself
    if (
      member.id === interaction.user.id ||
      member.id === client.user.id ||
      member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      const embed = new EmbedBuilder()
        .setColor(0xffcc00)
        .setTitle("⚠️ Ban Not Allowed")
        .setDescription("You cannot ban this user.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {
      await member.ban({ reason });
      const embed = new EmbedBuilder()
        .setColor(0x00ff99)
        .setTitle("✅ User Banned")
        .setDescription(
          `**${targetUser.tag}** has been banned.\n**Reason:** ${reason}`
        )
        .setTimestamp()
        .setFooter({
          text: `Banned by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("❌ Ban Failed")
        .setDescription("An error occurred while trying to ban this user.");
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
