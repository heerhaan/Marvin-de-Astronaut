const { adminID, stadthouderID, burgerijID, spanjoolID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'os',
	admin : true,
	execute(message) {
        const catchErr = err => {console.log(err)}
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const spanjoolRol = message.guild.roles.cache.get(spanjoolID);

        function removeRoleForMember(member) {
            if (!member) {
                logKanaal.send(`Kon lid ${member} niet vinden, oei!`);
            }
            else {
                var gebruikerRol;
                
                if (member.roles.cache.has(adminID)) { gebruikerRol = message.guild.roles.cache.get(stadthouderID); }
                else { gebruikerRol = message.guild.roles.cache.get(burgerijID); }

                member.roles.add(gebruikerRol);
                member.roles.remove(spanjoolRol);
            }
        }

        try {
            const members = message.mentions.members;
            members.each(removeRoleForMember);
            message.react('👌');
        }
        catch (err) {
            catchErr(err);
        }
	},
};