const Discord = require('discord.js');
const ms = require('ms');
const { ridderID, strafkanaalID, logkanaalID } = require('../../config.json');

module.exports = {
    name: "r",
    description: "Ridderen voor de opperbaasjes.",
    usage: '[getal][s/m/h/d]',
    admin : true,
    execute(message, args) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);
        const ridderRol = message.guild.roles.cache.get(ridderID);

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }
        if (member === message.guild.me) {
            return message.channel.send('Ik waardeer het gebaar enorm maar ik ben een robot dus die ridder hoeft echt niet.');
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

        if (member.roles.cache.has(knightRoleId)) {
            return message.channel.send(`Leuk dat je zo hard aan het simpen bent voor ${member.displayName} maar meer ridder is onnodig.`);
        }

        // God, eindelijk knnen we ridder toevoegen aan diens rollen
        try {
            member.roles.add(ridderRol);
        } catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is ridder voor **${ms(time, { long: true })}**.`)
            .addField('Reden', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        strafKanaal.send(muteEmbed);

        // Verwijderd de ridder rol weer
        member.timeout = message.client.setTimeout(() => {
        try {
            member.roles.remove(ridderRol);
            const unmuteEmbed = new Discord.MessageEmbed()
                .setTitle(`${member} behoort weer tot het gewone voetvolk`)
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