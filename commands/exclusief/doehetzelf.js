module.exports = {
	name: 'dhz',
	description: 'kan Haan mee aangeven dat mensen ook zelf iets kunnen doen',
	execute(message) {
        message.delete();
        var part1 = "Met al die tijd die je besteed aan het delen van je goede suggesties had je het ook zelf kunnen toevoegen. ";
        var part2 = "Gelukkig is deze bot openbron, dus voeg maar lekker zelf een trekverzoek toe! ";
        var part3 = "\n https://github.com/heerhaan/Marvin-de-Astronaut";
        message.channel.send(part1 + part2 + part3);
	},
};