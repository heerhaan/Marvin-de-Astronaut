const Discord = require('discord.js');
const ms = require('ms');
const { burgerijID, kopdichtID, strafkanaalID, logkanaalID } = require('../../config.json');

module.exports = {
    name: "k",
    description: "Met kop dicht wordt nooit gemeemd.",
    usage: '[getal][s/m/h/d]',
    admin : true,
    execute(message, args) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const kopdichtRol = message.guild.roles.cache.get(kopdichtID);
        const burgerijRol = message.guild.roles.cache.get(burgerijID);

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Het is niet de bedoeling dat je meemt met Kop Dicht, al helemaal niet door het aan mij te geven.');
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
            reason = '`dit is geen meem`';
        }
        if (reason.length > 1024) {
            reason = reason.slice(0, 1021) + '...';
        }

        if (member.roles.cache.has(kopdichtID)) {
            return message.channel.send(`Wat de neuk heeft ${member.displayName} geflikt dat één Kop Dicht niet genoeg was, of heeft Paard weer schijt aan zijn strafrollen?`);
        }

        try {
            member.roles.add(kopdichtRol);
            member.roles.remove(burgerijRol);
        } catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} heeft Kop Dicht voor **${ms(time, { long: true })}**.`)
            .addField('Reden', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        strafKanaal.send(muteEmbed);

        // Ontspanjool
        member.timeout = message.client.setTimeout(() => {
        try {
            member.roles.add(burgerijRol);
            member.roles.remove(kopdichtRol);
            const unmuteEmbed = new Discord.MessageEmbed()
                .setTitle(`${member.displayName} probeert het weer als gewoon lid.`)
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