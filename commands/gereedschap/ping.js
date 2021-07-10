module.exports = {
	name: 'ping',
	description: 'does nie!',
	execute(message, args) {
		message.channel.send('stop daarmee');
	},
};