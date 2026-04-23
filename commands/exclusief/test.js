const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('hiermee wordt getest!'),
	async execute(interaction) {
		await interaction.reply('Kappen. Nu.');

        /*execute(message, args) {
            var text = 'args: ';
            var number = 0;
            args.forEach(element => {
                ++number;
                message.channel.send(ding(element));
                text += `arg${number} ${element}, `;
            });
            message.channel.send(text);
        },*/
	},
};

function ding(msg) {
    return `Het meegegeven bericht betreft: ${msg}`;
}