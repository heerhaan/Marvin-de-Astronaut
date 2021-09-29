module.exports = {
	name: 'avatar',
	description: 'Bestelt automatisch alle seizoenen van Avatar: The Last Airbender.',
	execute(message, args) {
		if (args) {
			var mentioned = message.mentions.members.first() ?? message.guild.members.cache.get(args[0]);
			if (mentioned) {
				message.channel.send(mentioned.avatarURL);
			}
		}
		message.channel.send(message.author.avatarURL);
	},
};