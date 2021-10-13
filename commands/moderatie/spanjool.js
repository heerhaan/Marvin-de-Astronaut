const Discord = require('discord.js');
const ms = require('ms');
const { adminID, stadthouderID, burgerijID, spanjoolID, strafkanaalID, logkanaalID, alvaID, kopdichtID, ridderID } = require('../../config.json');

module.exports = {
    name: "s",
    description: "Spanjoleren kun je leren",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        const catchErr = err => {console.log(err)}
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const spanjoolRol = message.guild.roles.cache.get(spanjoolID);
        let gebruikerRol;

        const member = message.mentions.members.first() ?? message.guild.members.cache.find(member => member.username === args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Jij denkt dat jij mij kan spanjoleren? Hahahahahahahahah, ga kaas eten man.');
        }
        if (member.roles.cache.has(adminID)) {
            gebruikerRol = message.guild.roles.cache.get(stadthouderID);
        }
        else {
            gebruikerRol = message.guild.roles.cache.get(burgerijID);
        }

        let time;
        let reden;
        if (!args[1]) {
            let ranMin = Math.floor(Math.random() * 30);
            time = ms(`${ranMin}m`);
        }
        else {
            time = ms(args[1]);
            if (time > 1209600000) { // Maximum op 14 dagen want langer dan dat vindt de app niet leuk
                return message.channel.send('Zou top zijn als de ingevoerde tijd niet zo ontieglijk lang was (minder dan 14 dagen aub).');
            }
            else if (!time) {
                let ranMin = Math.floor(Math.random() * 30);
                time = ms(`${ranMin}m`);
                reden = args.slice(1).join(' ');
            }
            else {
                reden = args.slice(2).join(' ');
            }
        }
        let duur = `**${ms(time, { long: true })}**`;

        if (!reden) {
            reden = 'Geen reden gegeven';
        }
        if (reden.length > 1024) {
            reden = reden.slice(0, 1021) + '...';
        }

        const otherPunishmentRoles = [alvaID, kopdichtID, ridderID];

        otherPunishmentRoles.forEach((roleID) => {
            if (member.roles.cache.has(roleID)) {
                let role = message.guild.roles.cache.get(roleID);
                try {
                    member.roles.remove(role);
                } catch (e) {
                    console.log(`Kon ${role} niet verwijderen!`);
                }
            }
        })

        if (member.roles.cache.has(spanjoolID)) {
            return message.channel.send(`Ik snap dat ${member.displayName} kut is maar het is niet alsof die nu dubbelspanjool wordt ofzo`);
        }


        try {
            member.roles.add(spanjoolRol);
            member.roles.remove(gebruikerRol);
        } catch (err) {
            console.log(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is spanjool voor ${duur}`)
            .addField('Reden', reden)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);

        strafKanaal.send(muteEmbed)
            .then(msg => {
                msg.delete({timeout: time}).catch(catchErr)
            })
            .catch(logKanaal.send("Strafbericht kon niet verwijderd worden"));
        message.react('👌');

        // Als er een tijd is, wordt deze vanaf hier beheerd
        if(time) {
            member.timeout = message.client.setTimeout(() => {
                try {
                    member.roles.add(gebruikerRol);
                    member.roles.remove(spanjoolRol);
                }
                catch (err) {
                    console.log(err);
                    return message.channel.send('Oei, het verwijderen van de rol ging mis. Kan ik dat wel?', err.message);
                }
            }, time);
        }
    }
}