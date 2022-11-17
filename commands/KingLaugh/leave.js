const { SlashCommandBuilder } = require("@discordjs/builders")
const {joinVoiceChannel, createAudioPlayer, createAudioResource, createReadStream, AudioPlayerStatus, VoiceConnectionStatus, SubscriptionStatus, StreamType  } = require("@discordjs/voice");

fs = require('fs')

const audioPlayer = createAudioPlayer()

module.exports = {
	data: new SlashCommandBuilder()
                .setName("leave")
				.setDescription("Leaves the VC."),
     
	async execute(interaction, client) {
		 
        console.log(interaction.user.tag + " used command " + interaction.commandName + " in " + interaction.guild.name + " at " + interaction.createdAt )
        

        // disconnect from voice channel
        joinVoiceChannel({
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        }).destroy(audioPlayer)

        
        //disconnect bot from voice channel
        interaction.reply("Left the VC! HEHEHEHA!")
    

	},
}

