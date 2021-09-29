const Discord = require('discord.js');
const ms = require('ms');
const { burgerijID, alvaID, strafkanaalID, logkanaalID } = require('../../config.json');

module.exports = {
    name: "a",
    description: "Alvist voor de echte kutjes.",
    usage: '[getal][s/m/h/d]',
    admin : true,
    execute(message, args) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const alvaRol = message.guild.roles.cache.get(alvaID);
        const burgerijRol = message.guild.roles.cache.get(burgerijID);

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Als er iets niet lukt door je eigen incompetentie dan moet je het probleem bij jezelf zoeken, niet bij mij.');
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

        if (member.roles.cache.has(alvaID)) {
            return message.channel.send(`${member.displayName} moet wel bijster kut doen als er om dubbele alvist gevraagd wordt, begrijpelijk doch nutteloos.`);
        }

        try {
            member.roles.add(alvaRol);
            member.roles.remove(burgerijRol);
        }
        catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is alvist voor **${ms(time, { long: true })}**.`)
            .addField('Reden', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        strafKanaal.send(muteEmbed);

        member.timeout = message.client.setTimeout(() => {
        try {
            member.roles.add(burgerijRol);
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