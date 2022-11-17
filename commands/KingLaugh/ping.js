const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns the ping of the bot.'),
    async execute(interaction, client) {
        try {
            
            await interaction.reply({ content: "Pinging...", fetchReply: true });
            console.log("Command /ping run at", Date.now(),  "by:", interaction.user.tag);
            var embed = new EmbedBuilder()
            .setTitle("Pong 🏓")
            .setDescription(`\`${Math.abs(Date.now() - interaction.createdTimestamp)}ms\``)
            await interaction.editReply({ embeds: [embed]})
        } 
        catch (err) {
            console.log("Something Went Wrong => ", err);
        }
    }
}