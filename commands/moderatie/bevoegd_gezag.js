const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "bg",
    description: "Officieel moderatiebericht",
    usage: '[bericht]',
    admin : true,
    execute(message, args) {
        const catchErr = err => { console.log(err) }

        if (!args[0]) {
            return message.channel.send('Gelieve een geldig bericht in te voeren voordat de situatie uit de hand loopt.');
        }

        const ordahEmbed = new EmbedBuilder()
            .setColor([30, 151, 39])
            .setTitle("Bevoegd Gezag")
            .setDescription(args.join(' ') + '\n\n**Bevoegd Gezag is een officieel en serieus Stadthouder bericht!\n' + 'Naar de opdracht in dit bericht moet worden geluisterd!**')
            .setAuthor({ name: `${message.author.username} #${message.author.discriminator}`, iconURL: message.author.avatarURL()})
            .setTimestamp(Date.now())
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });
        
        message.delete().catch(catchErr);
        return message.channel.send({ embeds: [ordahEmbed] });
    }
}