module.exports = {
    name: "k",
    description: "Met kop dicht wordt nooit gemeemd.",
    usage: 'k [getal][s/m/h/d]',
    admin : true,
    execute(message, args) {
        require('ms');
        const Discord = require('discord.js');

        const strafKanaalID = "321878884935008266";
        const strafKanaal = message.client.channels.cache.get(strafKanaalID);
        const shutId = '268472232265777163';
        
        const shutRoleId = message.guild.roles.cache.get(shutId);
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

        if (member.roles.cache.has(shutRoleId)) {
            return message.channel.send(`Wat de neuk heeft ${member} geflikt dat één Kop Dicht niet genoeg was, of heeft Paard weer schijt aan zijn strafrollen?`);
        }

        try {
            member.roles.add(shutRoleId);
        } catch (err) {
            console.log(err)
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member} heeft Kop Dicht voor **${ms(time, { long: true })}**.`)
            .addField('Reden', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        strafKanaal.send(muteEmbed);

        // Ontspanjool
        member.timeout = message.client.setTimeout(() => {
        try {
            member.roles.remove(shutRoleId);
            const unmuteEmbed = new Discord.MessageEmbed()
                .setTitle(`${member} probeert het weer als gewoon lid.`)
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
            strafKanaal.send(unmuteEmbed);
        } catch (err) {
            console.log(err)
            return message.channel.send('Oei, het verwijderen van de rol ging mis. Kan ik dat wel?', err.message);
        }
        }, time);
    }
}