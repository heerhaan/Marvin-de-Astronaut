const Discord = require('discord.js');

module.exports = {
    name: "bg",
    description: "Officieel moderatiebericht",
    usage: '[bericht]',
    admin : true,
    execute(message, args) {
        if (!args[0]) {
            return message.channel.send('Voer een bericht in kut!');
        }
        const bgEmbed = new Discord.MessageEmbed()
            .setTitle("Bevoegd Gezag")
            .setDescription(args.join(' ') + '\n\n**Bevoegd Gezag is een officieel en serieus Stadthouder bericht!\n' + 
            'Naar de opdracht in dit bericht moet worden geluisterd!**')
            .setAuthor(message.author.username + "#" + message.author.discriminator, iconURL=message.author.avatarURL())
            .setTimestamp(Date.now())
            .setColor([30, 151, 39])
            .setFooter(message.guild.name, message.guild.iconURL());
        message.delete()
        return message.channel.send(bgEmbed);
    }
}