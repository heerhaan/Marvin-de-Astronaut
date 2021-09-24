module.exports = {
    name: "a",
    description: "Alvist voor de echte kutjes.",
    usage: 'a [getal][s/m/h/d]',
    admin : true,
    execute(message, args) {
        require('ms');
        const Discord = require('discord.js');
        
        const alvaId = '430970986037510154';
        const strafKanaalID = "321878884935008266";
        const strafKanaal = message.client.channels.cache.get(strafKanaalID);
        
        const alvaRoleId = message.guild.roles.cache.get(alvaId);
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

        if (member.roles.cache.has(alvaRoleId)) {
            return message.channel.send(`${member} moet wel bijster kut doen als er om dubbele alvist gevraagd wordt, begrijpelijk doch nutteloos.`);
        }

        try {
            member.roles.add(alvaRoleId);
        }
        catch (err) {
            console.log(err)
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member} is alvist voor **${ms(time, { long: true })}**.`)
            .addField('Reden', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        strafKanaal.send(muteEmbed);

        member.timeout = message.client.setTimeout(() => {
        try {
            member.roles.remove(alvaRoleId);
            const unmuteEmbed = new Discord.MessageEmbed()
                .setTitle(`${member} is ontsnapt uit de TBS-kliniek en trekt weer verder.`)
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