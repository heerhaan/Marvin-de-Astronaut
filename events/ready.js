const cron = require('cron');

module.exports = {
	name: 'ready',
	once: true,
	execute() {
        console.log(`Marvin de Astronaut gaat er weer voor!`);
	},
};