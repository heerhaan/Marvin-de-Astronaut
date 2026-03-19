import {SlashCommandBuilder} from "discord.js";


export default {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('hiermee wordt getest!'),
	async execute(interaction) {
		await interaction.reply('Kappen. Nu.');
	},
};

