const common = require("../../common.js");

module.exports = {
	name: 'ping',
	description: 'does nie!',
	execute(message) {
		message.channel.send('stop daarmee');
		message.channel.send(`oooo ${common.controle("succc")}`);
	},
};