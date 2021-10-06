const Discord = require('discord.js');
const ms = require('ms');
const { adminID, stadthouderID, burgerijID, alvaID, strafkanaalID, logkanaalID } = require('../../config.json');

module.exports = {
    name: "a",
    description: "Alvist voor de echte kutjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin: true,
    execute(message, args) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const alvaRol = message.guild.roles.cache.get(alvaID);
        var gebruikerRol;

        const member = message.mentions.members.first() ?? message.guild.members.cache.find(mem => mem.displayName === args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Als er iets niet lukt door je eigen incompetentie dan moet je het probleem bij jezelf zoeken, niet bij mij.');
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

        if (member.roles.cache.has(alvaID)) {
            return message.channel.send(`${member.displayName} moet wel bijster kut doen als er om dubbele alvist gevraagd wordt, begrijpelijk doch nutteloos.`);
        }

        try {
            member.roles.add(alvaRol);
            member.roles.remove(gebruikerRol);
        }
        catch (err) {
            console.log(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is alvist voor ${duur}`)
            .addField('Reden', reden)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            
        strafKanaal.send(muteEmbed)
            .then(msg => {
                msg.delete({timeout: time})
            })
            .catch(console.log("Strafembed kon niet verwijderd worden"));
        message.react('👌');

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