const { burgerijID, ridderID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'or',
	admin : true,
	execute(message) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const ridderRol = message.guild.roles.cache.get(ridderID);
        const burgerijRol = message.guild.roles.cache.get(burgerijID);

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }

		try {
            member.roles.add(burgerijRol);
            member.roles.remove(ridderRol);
        }
        catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
	},
};