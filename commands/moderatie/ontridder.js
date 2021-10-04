const { adminID, stadthouderID, burgerijID, ridderID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'or',
	admin : true,
	execute(message) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const ridderRol = message.guild.roles.cache.get(ridderID);
        
        function removeRoleForMember(member) {
            let gebruikerRol;
            if (!member) {
                logKanaal.send(`Kon lid ${member} niet vinden bij or'en, oei!`);
            }
            else {
                if (member.roles.cache.has(adminID)) { gebruikerRol = message.guild.roles.cache.get(stadthouderID); }
                else { gebruikerRol = message.guild.roles.cache.get(burgerijID); }

                try {
                    member.roles.add(gebruikerRol);
                    member.roles.remove(ridderRol);
                }
                catch (err) {
                    logKanaal.send('Oei, het manipuleren van de rollen ging mis. Kan ik dat wel? ', err.message);
                }
            }
        }

        const members = message.mentions.members;
        members.each(removeRoleForMember);
        message.react('👌');
	},
};