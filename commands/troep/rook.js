module.exports = {
	name: 'rook',
	description: 'Om te laten weten dat je gaat smonken',
	execute(message, args) {
		message.channel.send(`Godnondejantje, ${message.author} wordt nog een partijtje hoger. Gaan jullie ook mee op deze ruimtereis?`)
	},
};