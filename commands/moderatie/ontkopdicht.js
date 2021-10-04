const { adminID, stadthouderID, burgerijID, kopdichtID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'ok',
	admin : true,
	execute(message) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const kopdichtRol = message.guild.roles.cache.get(kopdichtID);
        
        function removeRoleForMember(member) {
            let gebruikerRol;
            if (!member) {
                logKanaal.send(`Kon lid ${member} niet vinden bij ok'en, oei!`);
            }
            else {
                if (member.roles.cache.has(adminID)) { gebruikerRol = message.guild.roles.cache.get(stadthouderID); }
                else { gebruikerRol = message.guild.roles.cache.get(burgerijID); }

                try {
                    member.roles.add(gebruikerRol);
                    member.roles.remove(kopdichtRol);
                }
                catch (err) {
                    logKanaal.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
                }
            }
        }

        const members = message.mentions.members;
        members.each(removeRoleForMember);
        message.react('👌');
	},
};