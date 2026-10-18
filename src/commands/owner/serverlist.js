const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const ownerid = "1371023781484560509";

module.exports = {
    name: "serverlist",
    aliases: ["slt"],
    category: "owner",
    description: "Displays the list of Servers!",
    usage: " ",

    run: async (client, message, args) => {
        if (message.author.id == ownerid) {
            if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
                return message.channel.send("I Dont Have Permissions");
            }

            const backId = 'back';
            const forwardId = 'forward';
            const backButton = new MessageButton({
                style: 'SECONDARY',
                label: 'Back',
                emoji: '⬅️',
                customId: backId
            });
            const forwardButton = new MessageButton({
                style: 'SECONDARY',
                label: 'Forward',
                emoji: '➡️',
                customId: forwardId
            });

            const { author, channel } = message;
            const guilds = [...client.guilds.cache.values()];

            /**
             * Creates an embed with guilds starting from an index.
             * @param {number} start The index to start from.
             * @returns {Promise<MessageEmbed>}
             */
            const generateEmbed = async start => {
                const current = guilds.slice(start, start + 10);

                return new MessageEmbed({
                    title: `Showing guilds ${start + 1}-${start + current.length} out of ${guilds.length}`,
                    fields: await Promise.all(
                        current.map(async guild => ({
                            name: guild.name,
                            value: `**ID:** ${guild.id}\n**Owner:** ${(await guild.fetchOwner()).user.tag}`
                        }))
                    )
                });
            };

            const canFitOnOnePage = guilds.length <= 10;
            const embedMessage = await channel.send({
                embeds: [await generateEmbed(0)],
                components: canFitOnOnePage
                    ? []
                    : [new MessageActionRow({ components: [forwardButton] })]
            });

            if (canFitOnOnePage) return;

            const collector = embedMessage.createMessageComponentCollector({
                filter: ({ user }) => user.id === author.id
            });

            let currentIndex = 0;
            collector.on('collect', async interaction => {
                interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10);
                await interaction.update({
                    embeds: [await generateEmbed(currentIndex)],
                    components: [
                        new MessageActionRow({
                            components: [
                                ...(currentIndex ? [backButton] : []),
                                ...(currentIndex + 10 < guilds.length ? [forwardButton] : [])
                            ]
                        })
                    ]
                });
            });
        }
    }
};