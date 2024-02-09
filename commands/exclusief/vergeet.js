module.exports = {
	name: 'vergeet',
    description: 'Bij deze worden alle strafgegevens vergeten, haanclusief echter',
    exclusive: true,
	execute(message) {
        return message.channel.send("Ik werk momenteel niet, misschien wel nooit niet!");
	},
};