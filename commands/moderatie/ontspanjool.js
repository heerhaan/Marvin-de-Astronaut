const { adminID, stadthouderID, burgerijID, spanjoolID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'os',
	admin : true,
	execute(message) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const spanjoolRol = message.guild.roles.cache.get(spanjoolID);

        function removeRoleForMember(member) {
            let gebruikerRol;
            if (!member) {
                logKanaal.send(`Kon lid ${member} niet vinden, oei!`);
                console.log(`Commando [os] faalde, reden: ${member} niet gevonden`);
            }
            else {
                if (member.roles.cache.has(adminID)) { gebruikerRol = message.guild.roles.cache.get(stadthouderID); }
                else { gebruikerRol = message.guild.roles.cache.get(burgerijID); }

                try {
                    member.roles.add(gebruikerRol);
                    member.roles.remove(spanjoolRol);
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