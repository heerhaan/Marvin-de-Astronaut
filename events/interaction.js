const { Events } = require('discord.js');
const { prefix, ownerID, adminID } = require("../config.json");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// Underneath prevents execution for any non-slash command thing
        if (!interaction.isChatInputCommand()) return;

        const slashCommand = interaction.client.commands.get(interaction.commandName);

        if (slashCommand) {
            try {
                await slashCommand.execute(interaction);
            }
            catch (error) {
                console.error(error);
    
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'Oef auwie uitvoering mislukt', ephemeral: true });
                }
                else {
                    await interaction.reply({ content: 'Oef auwie uitvoering mislukt', ephemeral: true });
                }
            }
        }
        else {
            //console.error(`No matching command for ${interaction.commandName}`);
            //return;
        }
	},
}