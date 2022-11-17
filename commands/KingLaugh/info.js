const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Shows some information about the bot."),
    async execute(interaction, client) {
        console.log(interaction.user.tag + " used command " + interaction.commandName + " in " + interaction.guild.name + " at " + interaction.createdAt )
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('About KingLaugh')
            .setDescription('HEHEHEHA. Made by Shia using Node.js')
            .setTimestamp()
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: 'KingLaugh - Version 3.0.0'
            })
        await interaction.reply({ embeds: [embed] });
    },
};
