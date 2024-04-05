const ms = require('ms');
const dayjs = require('dayjs');

module.exports = {
	name: 'tijd',
	description: 'Hoe laat was het ook alweer?',
	execute(message) {
        var tenMinute = "10m";

        message.channel.send("We gaan wat dingen met tien minuten proberen hier hoor.");

        message.channel.send(`reguliere ms indicatie: ${ms(tenMinute, { long: true })}`);

        message.channel.send(`DagJS maar dan nu: ${dayjs(Date.now()).format("YYYY-MM-DD HH:mm")}`);

        message.channel.send(`DagJS over tien minuten: ${dayjs(Date.now() + ms(tenMinute)).format("YYYY-MM-DD HH:mm")}`);
	},
};