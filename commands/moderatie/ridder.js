const Discord = require('discord.js');
const ms = require('ms');
const { adminID, stadthouderID, burgerijID, ridderID, strafkanaalID, alvaID, kopdichtID, spanjoolID } = require('../../config.json');

module.exports = {
    name: "r",
    description: "Ridderen voor de opperbaasjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        const catchErr = err => { console.log(err); }
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const ridderRol = message.guild.roles.cache.get(ridderID);
        let gebruikerRol;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Ik waardeer het gebaar enorm maar ik ben een robot dus die ridder hoeft echt niet.');
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
        else if (reden.length > 1024) {
            reden = reden.slice(0, 1021) + '...';
        }

        const otherPunishmentRoles = [alvaID, kopdichtID, spanjoolID];

        otherPunishmentRoles.forEach((roleID) => {
            if (member.roles.cache.has(roleID)) {
                let role = message.guild.roles.cache.get(roleID);
                try {
                    member.roles.remove(role);
                } catch (e) {
                    console.log(`Kon ${role} niet verwijderen!`);
                }
            }
        });

        if (member.roles.cache.has(ridderID)) {
            return message.channel.send(`Leuk dat je zo hard aan het simpen bent voor ${member.displayName} maar meer ridder is onnodig.`);
        }

        try {
            member.roles.add(ridderRol);
        } catch (err) {
            catchErr(err);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is ridder voor ${duur}`)
            .addField('Reden', reden)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            
        strafKanaal.send(muteEmbed)
            .then(msg => {
                msg.delete({timeout: time}).catch(catchErr)
            })
            .catch(catchErr);
        message.react('👌');

        if(time) {
            member.timeout = message.client.setTimeout(() => {
                try {
                    member.roles.remove(ridderRol);
                } catch (err) {
                    catchErr(err);
                }
            }, time);
        }
    }
}