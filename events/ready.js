const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        console.log("Bot launched correctly at:" , Date.now());
        setInterval(pickPresence, 7200000);
        pickPresence();

        async function pickPresence () {

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: 'Laughing as always!',
                            type: ActivityType.Watching,
                        },
                    
                    ],

                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};