const Discord = require('discord.js');
const ms = require('ms');
const { burgerijID, spanjoolID, strafkanaalID, logkanaalID } = require('../../config.json');

module.exports = {
    name: "s",
    description: "Spanjoleren kun je leren.",
    usage: '[getal][s/m/h/d]',
    admin : true,
    execute(message, args) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const spanjoolRol = message.guild.roles.cache.get(spanjoolID);
        const burgerijRol = message.guild.roles.cache.get(burgerijID);

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Jij denkt dat jij mij kan spanjoleren? Hahahahahahahahah, ga kaas eten man.');
        }

        var time;
        var duur;
        if (!args[1]) {
            time = null;
            duur = "oneindig lang";
        } 
        else {
            time = ms(args[1]);
            if (!time || time > 1209600000) { // Maximum op 14 dagen want langer dan dat vindt de app niet leuk
                return message.channel.send('Zou top zijn als de ingevoerde tijd niet zo ontieglijk lang was (minder dan 14 dagen aub).');
            }
            duur = `**${ms(time, { long: true })}**`;
        }
        

        let reason = args.slice(2).join(' ');
        if (!reason) {
            reason = '`Geen reden gegeven`';
        }
        if (reason.length > 1024) {
            reason = reason.slice(0, 1021) + '...';
        }

        if (member.roles.cache.has(spanjoolID)) {
            return message.channel.send(`Ik snap dat ${member.displayName} kut is maar het is niet alsof die nu dubbelspanjool wordt ofzo`);
        }

        // God, eindelijk knnen we spanjool toevoegen aan diens rollen
        try {
            member.roles.add(spanjoolRol);
            member.roles.remove(burgerijRol);
        } catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is spanjool voor ${duur}.`)
            .addField('Reden', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        strafKanaal.send(muteEmbed);

        if(time) {
            // Verwijderen van straf
            member.timeout = message.client.setTimeout(() => {
                try {
                    member.roles.add(burgerijRol);
                    member.roles.remove(spanjoolRol);
                    const unmuteEmbed = new Discord.MessageEmbed()
                        .setTitle(`${member.displayName} is weer genaturaliseerd tot Nederlander.`)
                        .setTimestamp()
                        .setColor(message.guild.me.displayHexColor);
                    strafKanaal.send(unmuteEmbed);
                }
                catch (err) {
                    logKanaal.send(err);
                    return message.channel.send('Oei, het verwijderen van de rol ging mis. Kan ik dat wel?', err.message);
                }
            }, time);
        }
    }
}