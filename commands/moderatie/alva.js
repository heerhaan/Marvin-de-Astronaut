const Discord = require('discord.js');
const ms = require('ms');
const { adminID, stadthouderID, burgerijID, alvaID, strafkanaalID, spanjoolID, ridderID, kopdichtID } = require('../../config.json');

module.exports = {
    name: "a",
    description: "Alvist voor de echte kutjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin: true,
    execute(message, args) {
        const catchErr = err => {console.log(err)}
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const alvaRol = message.guild.roles.cache.get(alvaID);
        let gebruikerRol;

        const member = message.mentions.members.first() ?? message.guild.members.cache.find(mem => mem.displayName === args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Als er iets niet lukt door je eigen incompetentie dan moet je het probleem bij jezelf zoeken, niet bij mij.');
        }
        if (userHasRole(member, alvaID)) {
            return message.channel.send(`${member.displayName} moet wel bijster kut doen als er om dubbele alvist gevraagd wordt, begrijpelijk doch nutteloos.`);
        }

        if (userHasRole(member, adminID)) {
            gebruikerRol = message.guild.roles.cache.get(stadthouderID);
        }
        else { gebruikerRol = message.guild.roles.cache.get(burgerijID); }

        let time;
        let reden;
        if (!args[1]) {
            time = getRandomPunishment();
        }
        else {
            time = ms(args[1]);
            // Maximum op 14 dagen want langer dan dat vindt de app niet leuk
            if (time > 1209600000) {
                return message.channel.send('Zou top zijn als de ingevoerde tijd niet zo ontieglijk lang was (minder dan 14 dagen aub).');
            }
            else if (!time) {
                time = getRandomPunishment();
                reden = args.slice(1).join(' ');
            }
            else { reden = args.slice(2).join(' '); }
        }
        let duur = `**${ms(time, { long: true })}**`;

        if (!reden) {
            reden = 'waarom weet ik niet maar waarschijnlijk terminaal autistisch gedrag.';
        }
        if (reden.length > 1024) {
            reden = reden.slice(0, 1021) + '...';
        }

        const otherPunishmentRoles = [spanjoolID, kopdichtID, ridderID];

        otherPunishmentRoles.forEach((roleID) => {
            if (userHasRole(member, roleID)) {
                let role = message.guild.roles.cache.get(roleID);
                try {
                    member.roles.remove(role);
                } catch (err) {
                    catchErr(err);
                }
            }
        });

        try {
            member.roles.add(alvaRol);
            member.roles.remove(gebruikerRol);
        }
        catch (err) {
            catchErr(err);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is alvist voor ${duur}`)
            .addField('Reden', reden)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            
        try {
            strafKanaal.send(muteEmbed)
            .then(msg => {
                msg.delete({timeout: time}).catch(catchErr)
            })
            message.react('👌');
        } catch (err) {
            catchErr(err);
        }
        

        member.timeout = message.client.setTimeout(() => {
        try {
            member.roles.add(gebruikerRol);
            member.roles.remove(alvaRol);
        } catch (err) {
            console.log(err);
            return message.channel.send('Oei, het verwijderen van de rol ging mis. Kan ik dat wel?', err.message);
        }
        }, time);
    }
}

function userHasRole(member, roleId) {
    return member.roles.cache.has(roleId);
}

function getRandomPunishment() {
    let ranMin = Math.random() * (210 - 30) + 30;
    return ms(`${ranMin}m`);
}