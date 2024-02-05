module.exports = {
	name: 'bezem',
	description: 'Verwijdert een gegeven aantal berichten.',
    args: true,
    usage: '<getal tussen de 2 en 100>',
    permissions: 'MANAGE_MESSAGES',
    admin: true,
	execute(message, args) {
        // Onderstaande waarde representeert het aantal berichten dat verwijderd moet worden
        let amount = parseInt(args[0]);

		if (isNaN(amount)) {
            return message.reply('Zeg uhh, volgens mij is dat geen getal, beste vriend.');
        } else if (amount < 2 || amount > 100) {
            return message.channel.send("Zou fijn zijn als je een normale hoeveelheid (niet meer dan 100) intikt.")
        } else {
            let actual = amount + 1;
            message.channel.bulkDelete(actual, true);
        }
	},
};