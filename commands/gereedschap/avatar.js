module.exports = {
	name: 'avatar',
	description: 'Bestelt automatisch alle seizoenen van Avatar: The Last Airbender.',
	execute(message, args) {
		message.reply(message.author.avatarURL);
	},
};