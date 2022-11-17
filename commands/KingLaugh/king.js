const { SlashCommandBuilder } = require("@discordjs/builders")
const{ AttachmentBuilder } = require('discord.js');

//command that sends a message with a random image from a folder called "Images"
module.exports = {
    data: new SlashCommandBuilder()
        .setName("king")
        .setDescription("Shows the great king."),
    async execute(interaction, client) {

      
        console.log(interaction.user.tag + " used command " + interaction.commandName + " in " + interaction.guild.name + " at " + interaction.createdAt )

        const fs = require('fs');
        const path = require('path');
        const folder = path.join(__dirname, '../Images');
        const files = fs.readdirSync(folder);
        const file = files[Math.floor(Math.random() * files.length)];
        const image = path.join(folder, file);
        // Attach the file to the message
        const attachment = new AttachmentBuilder(image);
        await interaction.reply({ files: [attachment] });
    },
};