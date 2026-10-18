/**
 * @param {import('discord.js').GuildMember} member
 * @param {string} messageId
 */
module.exports = async (member, messageId) => {
  if (!messageId) return "You must provide a valid message id.";

  if (!member.permissions.has("MANAGE_MESSAGES")) {
    return "You need to have the manage messages permissions to manage giveaways.";
  }

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return `Unable to find a giveaway for messageId: ${messageId}`;

  if (!giveaway.pauseOptions.isPaused) return "This giveaway is not paused.";

  try {
    await giveaway.unpause();
    return "Success! Giveaway unpaused!";
  } catch (error) {
    member.client.logger.error("Giveaway Resume", error);
    return `An error occurred while unpausing the giveaway: ${error.message}`;
  }
};