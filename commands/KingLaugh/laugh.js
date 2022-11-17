const { SlashCommandBuilder } = require("@discordjs/builders")
const {joinVoiceChannel, createAudioPlayer, createAudioResource, createReadStream, AudioPlayerStatus, VoiceConnectionStatus, SubscriptionStatus, StreamType  } = require("@discordjs/voice");
const {join} = require('path')

fs = require('fs')

const audioPlayer = createAudioPlayer()
var done = false;
var ch = 0;

module.exports = {
	data: new SlashCommandBuilder()
                .setName("laugh")
		.setDescription("HEHEHEHA")
		.addStringOption((option) =>
			option.setName("times").setDescription("HEHEHEHA").setRequired(false))
                .addStringOption((option) =>
			option.setName("channel").setDescription("For  Jumpscares, HEHEHEHA").setRequired(false)),
    
	async execute(interaction, client) {
		 
        global.interaction = interaction;
        console.log(interaction.user.tag + " used command " + interaction.commandName + " in " + interaction.guild.name + " at " + interaction.createdAt )
        //check if user is connected to a voice channel
        if (!interaction.member.voice.channel) {
            if(interaction.options.getString("channel") == null) 
                    return interaction.reply("You must be in a voice channel to use this command!");
            ch = interaction.options.getString("channel")
            if (ch != 0){ 
                if (interaction.guild.channels.cache.get(ch) == null) {
                    return interaction.reply("Invalid channel ID!");
                }
            }
            joinVoiceChannel({
                channelId: ch,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            }).subscribe(audioPlayer)

        } else {
            joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            }).subscribe(audioPlayer)
        }
 	// Checks
        let t = interaction.options.getString("times")
        if(!t)  t = 1; 
        if(t > 20) t = 20;
        if(t < 1) t = 1;
		
        await interaction.reply("HEHEHEHA!")
        audiop(t);

        audioPlayer.on(AudioPlayerStatus.Idle, () => {
            if(done) {
                joinVoiceChannel({
                    guildId: interaction.guild.id,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                }).destroy(audioPlayer)
                done = false;
            }
            else {
                t = t - 1;
                audiop(t);
            }
        });
    },
}

async function audiop(times){
    // Base case
    if(times == 1){
        done = true;
    }
    // Select random file name from folder "Audio"
    var files = fs.readdirSync(join(__dirname, '../Audio'));
    var file = files[Math.floor(Math.random() * files.length)];
    resource = createAudioResource(fs.createReadStream(join(__dirname, '../Audio', file)), {
            inputType: StreamType.Arbitrary,
            inlineVolume: true,
            metadata: {
                title: file.toString(),
            },
        });
    audioPlayer.play(resource)
}

