const { adminID, stadthouderID, burgerijID, kopdichtID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'ok',
	admin : true,
	execute(message) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const kopdichtRol = message.guild.roles.cache.get(kopdichtID);
        var gebruikerRol;

        if (message.member.roles.cache.has(adminID)) {
            gebruikerRol = message.guild.roles.cache.get(stadthouderID);
        } else {
            gebruikerRol = message.guild.roles.cache.get(burgerijID);
        }

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }

		try {
            member.roles.add(gebruikerRol);
            member.roles.remove(kopdichtRol);
        }
        catch (err) {
            logKanaal.send(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }
	},
};