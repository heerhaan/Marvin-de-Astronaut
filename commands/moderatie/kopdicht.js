const Discord = require('discord.js');
const ms = require('ms');
const { adminID, stadthouderID, burgerijID, kopdichtID, strafkanaalID, logkanaalID } = require('../../config.json');

module.exports = {
    name: "k",
    description: "Met kop dicht wordt nooit gemeemd.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const kopdichtRol = message.guild.roles.cache.get(kopdichtID);
        var gebruikerRol;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Het is niet de bedoeling dat je meemt met Kop Dicht, al helemaal niet door het aan mij te geven.');
        }
        if (member.roles.cache.has(adminID)) {
            gebruikerRol = message.guild.roles.cache.get(stadthouderID);
        }
        else {
            gebruikerRol = message.guild.roles.cache.get(burgerijID);
        }

        var time;
        var reden;
        if (!args[1]) {
            var ranMin = Math.floor(Math.random() * 30);
            time = ms(`${ranMin}m`);
        }
        else {
            time = ms(args[1]);
            if (time > 1209600000) { // Maximum op 14 dagen want langer dan dat vindt de app niet leuk
                return message.channel.send('Zou top zijn als de ingevoerde tijd niet zo ontieglijk lang was (minder dan 14 dagen aub).');
            }
            else if (!time) {
                var ranMin = Math.floor(Math.random() * 30);
                time = ms(`${ranMin}m`);
                reden = args.slice(1).join(' ');
            }
            else {
                reden = args.slice(2).join(' ');
            }
        }
        var duur = `**${ms(time, { long: true })}**`;

        if (!reden) {
            reden = 'Geen reden gegeven';
        }
        if (reden.length > 1024) {
            reden = reden.slice(0, 1021) + '...';
        }

        if (member.roles.cache.has(kopdichtID)) {
            return message.channel.send(`Wat de neuk heeft ${member.displayName} geflikt dat één Kop Dicht niet genoeg was, of heeft Paard weer schijt aan zijn strafrollen?`);
        }

        try {
            member.roles.add(kopdichtRol);
            member.roles.remove(gebruikerRol);
        } catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} heeft Kop Dicht voor **${duur}**.`)
            .addField('Reden', reden)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);

        strafKanaal.send(muteEmbed)
            .then(msg => {
                msg.delete({timeout: time})
            })
            .catch(logKanaal.send("Strafbericht kon niet verwijderd worden"));
        message.react('👌');

        if(time) {
            member.timeout = message.client.setTimeout(() => {
                try {
                    member.roles.add(gebruikerRol);
                    member.roles.remove(kopdichtRol);
                } catch (err) {
                    logKanaal.send(err);
                    return message.channel.send('Oei, het verwijderen van de rol ging mis. Kan ik dat wel?', err.message);
                }
            }, time);
        }
    }
}