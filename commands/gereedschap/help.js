const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Hiermee kan ik alles weergeven wat ik kan (erg veel)!',
	usage: '[commando naam]',
	execute(message, args) {
		const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Alle acties die ik kan ondernemen zijn hierrrrrrrr:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nIs dat niet genoeg voor je? Je kan het ook specificeren door ${prefix} help [commando naam] te sturen.`);
            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Lol oke, dat bestaat dus (nog) niet.');
        }

        data.push(`**Naam:** ${command.name}`);

        if (command.aliases) data.push(`**Alternatieven:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Beschrijving:** ${command.description}`);
        if (command.usage) data.push(`**Toepassing:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });
	},
};