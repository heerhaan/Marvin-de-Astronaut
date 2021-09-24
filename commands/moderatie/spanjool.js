module.exports = {
    name: "s",
    description: "Spanjoleren kun je leren.",
    usage: 's [getal][s/m/h/d]',
    admin : true,
    execute(message, args) {
        require('ms');
        const Discord = require('discord.js');

        const spanjoolId = '241653605134761985';
        
        const muteRoleId = message.guild.roles.cache.get(spanjoolId);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Jij denkt dat jij mij kan spanjoleren? Hahahahahahahahah, ga kaas eten man.');
        }

        if (!args[1]) {
            return message.channel.send('Gelieve een tijd in te voeren van 14 dagen of minder in dit format: [1s/m/h/d]');
        }

        let time = ms(args[1]);
        if (!time || time > 1209600000) { // Maximum op 14 dagen want langer dan dat vindt de app niet leuk
            return message.channel.send('Zou top zijn als de ingevoerde tijd niet zo ontieglijk lang was (minder dan 14 dagen aub).');
        }

        let reason = args.slice(2).join(' ');
        if (!reason) {
            reason = '`Geen reden gegeven`';
        }
        if (reason.length > 1024) {
            reason = reason.slice(0, 1021) + '...';
        }

        if (member.roles.cache.has(muteRoleId)) {
            return message.channel.send(`Ik snap dat ${member} kut is maar het is niet alsof die nu dubbelspanjool wordt ofzo`);
        }

        // God, eindelijk knnen we spanjool toevoegen aan diens rollen
        try {
            member.roles.add(muteRoleId);
        } catch (err) {
            console.log(err)
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member} is spanjool voor **${ms(time, { long: true })}**.`)
            .addField('Reden', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        message.channel.send(muteEmbed);

        // Ontspanjool
        member.timeout = message.client.setTimeout(() => {
            try {
                member.roles.remove(muteRoleId);
                const unmuteEmbed = new Discord.MessageEmbed()
                    .setTitle(`${member} is weer genaturaliseerd tot Nederlander.`)
                    .setTimestamp()
                    .setColor(message.guild.me.displayHexColor);
                message.channel.send(unmuteEmbed);
            }
            catch (err) {
                console.log(err)
                return message.channel.send('Oei, het verwijderen van de rol ging mis. Kan ik dat wel?', err.message);
            }
        }, time);
    }
}