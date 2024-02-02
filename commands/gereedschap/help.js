const { EmbedBuilder } = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Hiermee kan ik alles weergeven wat ik kan (erg veel)!',
	usage: '[commando naam]',
	execute(message, args) {
        const commands = message.client.commands;

        if (!args.length) {
            var commandMents = commands.map(cmd => cmd.name).join(', ');
            
            const allHelpEmbed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`De Heilige Schriften`)
                .addFields(
                    { name: "Alle commando's", value: commandMents }
                );

            message.channel.send({ embeds: [allHelpEmbed] });
            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply(`Nou ja oke, ik heb dus niks gevonden voor ${name}. Waarschijnlijk bestaat het niet of je weet teveel.`);
        }

        const helpEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Hulp voor ${command.name}`)
            .addFields(
                { name: 'Naam', value: command.name },
                { name: 'Beschrijving', value: command.description },
                { name: 'Toepassing', value: `${prefix}${command.name} ${command.usage}` },
            );

        message.channel.send({ embeds: [helpEmbed] });
	},
};