module.exports = {
	name: 'vergeet',
    description: '(WERKT NIET) Bij deze worden alle strafgegevens vergeten, haanclusief echter',
    exclusive: true,
	execute(message) {
        var opmerking = common.bijdehanteOpmerking();
        return message.channel.send(opmerking);
	},
};