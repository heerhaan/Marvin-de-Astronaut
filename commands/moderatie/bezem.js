module.exports = {
	name: 'bezem',
	description: 'Verwijdert een gegeven aantal berichten.',
    args: true,
    usage: '<getal tussen de 2 en 100>',
    permissions: 'MANAGE_MESSAGES',
	execute(message, args) {
        // Het aantal berichten dat verwijderd wordt
        let amount = parseInt(args[0]);

		if (isNaN(amount)) {
            return message.reply('Zeg uhh, volgens mij is dat geen getal, beste vriend.');
        }
        else if (amount < 2 || amount > 100) {
            return message.channel.send("Zou fijn zijn als je een normale hoeveelheid (niet meer dan 100) intikt.")
        }
        else {
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                return message.channel.send('Nou, dat berichten verwijderen ging helemaal mis.');
            });
        }
	},
};