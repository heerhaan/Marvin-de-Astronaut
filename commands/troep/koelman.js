module.exports = {
	name: 'koelman',
	execute(message) {
		let rng = Math.floor(Math.random() * 101);
		if (rng === 69) {
			message.channel.send(`haha seks <:huehuehuehuehuehue:438031814641057792>`);
		} else {
			message.channel.send(`Nou nou, heb jij een leuke commando ontdekt die nog geen nuttige functie heeft? Goed bezig hoor, wat mij betreft is jouw coolheidsniveau ongeveer ${rng}. Lekker bezig, Pik!`);
		}
	},
};