const { Events } = require('discord.js');
//const cron = require('cron');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        console.log(`${client.user.tag} gaat er weer voor!`);
	},
};