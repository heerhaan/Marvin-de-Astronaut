const Discord = require('discord.js');
const ms = require('ms');
const { adminID, stadthouderID, burgerijID, alvaID, strafkanaalID, logkanaalID } = require('../../config.json');

module.exports = {
    name: "a",
    description: "Alvist voor de echte kutjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    execute(message, args) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const alvaRol = message.guild.roles.cache.get(alvaID);
        var gebruikerRol;

        if (message.member.roles.cache.has(adminID)) {
            gebruikerRol = message.guild.roles.cache.get(stadthouderID);
        } else {
            gebruikerRol = message.guild.roles.cache.get(burgerijID);
        }

        const member = message.mentions.members.first() ?? message.guild.members.cache.find(mem => mem.displayName === args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Als er iets niet lukt door je eigen incompetentie dan moet je het probleem bij jezelf zoeken, niet bij mij.');
        }
        if (member) {
            return message.channel.send(`Gevonden gebruiker: ${member.displayName}`);
        }

        var time;
        var reden;
        if (!args[1]) {
            var ranMin = Math.floor(Math.random() * 30);
            time = `${ranMin}m`;
        }
        else {
            time = ms(args[1]);
            if (time > 1209600000) { // Maximum op 14 dagen want langer dan dat vindt de app niet leuk
                return message.channel.send('Zou top zijn als de ingevoerde tijd niet zo ontieglijk lang was (minder dan 14 dagen aub).');
            }
            else if (!time) {
                return message.channel.send("Op de een of andere manier heb ik geen idee wat voor tijd je invoerde, gek he! Format is [getal][s/m/u/d]")
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
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is alvist voor ${duur}`)
            .addField('Reden', reden)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        strafKanaal.send(muteEmbed);
        message.react('👌');

        member.timeout = message.client.setTimeout(() => {
        try {
            member.roles.add(gebruikerRol);
            member.roles.remove(alvaRol);
            const unmuteEmbed = new Discord.MessageEmbed()
                .setTitle(`${member.displayName} is ontsnapt uit de TBS-kliniek en trekt weer verder.`)
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
            strafKanaal.send(unmuteEmbed);
        } catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het verwijderen van de rol ging mis. Kan ik dat wel?', err.message);
        }
        }, time);
    }
}