const { adminID, stadthouderID, burgerijID, alvaID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'oa',
	admin : true,
	execute(message) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const alvaRol = message.guild.roles.cache.get(alvaID);

        function removeRoleForMember(member) {
            if (!member) {
                logKanaal.send(`Kon lid ${member} niet vinden bij ontalva'en, oei!`);
            }
            else {
                var gebruikerRol;

                if (member.roles.cache.has(adminID)) { gebruikerRol = message.guild.roles.cache.get(stadthouderID); }
                else { gebruikerRol = message.guild.roles.cache.get(burgerijID); }

                member.roles.add(gebruikerRol);
                member.roles.remove(alvaRol);
            }
        }

        try {
            const members = message.mentions.members;
            members.each(removeRoleForMember);
            message.react('👌');
        }
        catch (err) {
            logKanaal.send('Oei, het bewerken van de rol(len) ging mis. Kan ik dat wel? ', err.message);
        }
	},
};