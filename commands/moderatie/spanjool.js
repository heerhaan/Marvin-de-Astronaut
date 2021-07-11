module.exports = {
    name: "s",
    description: "Spanjoleren kun je leren.",
    execute(message, args, client) {
        const muteRoleId = message.guild.roles.cache.get('641355896919818253');
        let muteRole;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) 
        return message.channel.send('Please mention a user or provide a valid user ID');
        if (member === message.member)
        return message.channel.send('You cannot mute yourself');
        if (member === message.guild.me) return message.channel.send(message, 0, 'You cannot mute me');
        if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send('You cannot mute someone with an equal or higher role');
        if (!args[1])
        return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)');
        let time = ms(args[1]);
        if (!time || time > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
        return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)');

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`None Provided`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if (member.roles.cache.has(muteRoleId))
        return message.channel.send('Provided member is already muted');

        // Mute member
        try {
            member.roles.add(muteRoleId);
        } catch (err) {
            console.log(err)
            return message.channel.send('Please check the role hierarchy', err.message);
        }
        const muteEmbed = new MessageEmbed()
            .setTitle('Mute Member')
            .setDescription(`${member} has now been muted for **${ms(time, { long: true })}**.`)
            .addField('Moderator', message.member, true)
            .addField('Member', member, true)
            .addField('Time', `\`${ms(time)}\``, true)
            .addField('Reason', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        message.channel.send(muteEmbed);

        // Unmute member
        member.timeout = message.client.setTimeout(async () => {
        try {
            member.roles.remove(muteRole);
            const unmuteEmbed = new MessageEmbed()
            .setTitle('Unmute Member')
            .setDescription(`${member} has been unmuted.`)
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            message.channel.send(unmuteEmbed);
        } catch (err) {
            console.log(err)
            return message.channel.send('Please check the role hierarchy', err.message);
        }
        }, time);
    }
}