const { burgerijID, alvaID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'oa',
	admin : true,
	execute(message) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const alvaRol = message.guild.roles.cache.get(alvaID);
        const burgerijRol = message.guild.roles.cache.get(burgerijID);

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }

		try {
            member.roles.add(burgerijRol);
            member.roles.remove(alvaRol);
        }
        catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
	},
};