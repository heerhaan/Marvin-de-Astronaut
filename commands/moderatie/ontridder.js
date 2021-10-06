const { adminID, stadthouderID, burgerijID, ridderID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'or',
	admin : true,
	execute(message) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const ridderRol = message.guild.roles.cache.get(ridderID);
        
        function removeRoleForMember(member) {
            if (!member) {
                logKanaal.send(`Kon lid ${member} niet vinden bij or'en, oei!`);
            }
            else {
                var gebruikerRol;
                
                if (member.roles.cache.has(adminID)) { gebruikerRol = message.guild.roles.cache.get(stadthouderID); }
                else { gebruikerRol = message.guild.roles.cache.get(burgerijID); }

                member.roles.add(gebruikerRol);
                member.roles.remove(ridderRol);
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