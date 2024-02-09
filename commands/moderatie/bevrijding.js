const { adminID, stadthouderID, burgerijID, spanjoolID, logkanaalID } = require('../../config.json');

module.exports = {
	name: 'bevrijding',
    description: 'Om na te gaan of er knapen zijn die onterecht straf hebben',
    admin: true,
	execute(message) {
        //const logKanaal = message.client.channels.cache.get(logkanaalID);

        return;

        let oberSpanjolen = message.guild.members.cache.filter(m => m.roles.includes(spanjoolID));
        let oberSpanjolen2 = message.guild.members.cache.filter(m => m.roles.cache.get(spanjoolID));

        console.log(JSON.stringify(oberSpanjolen));
        console.log(JSON.stringify(oberSpanjolen2));

        if (!oberSpanjolen || oberSpanjolen.length === 0) {
            return message.channel.send("jonge, er zijn toch helemaal geen spanjolen momenteel. Klaphark.");
        }

        for (let i = 0; i < oberSpanjolen.length; i++) {
            let gebruiker = oberSpanjolen[i];

            message.channel.send(`Jij... ${gebruiker.userId}`);
        }
        
        let spanjoleringen = require('../../spanjoleringData.json');

        if (!spanjoleringen) return;

        let spanjolen = [];

        let verlossingenGepleegd = 0;

        for (var sleutel of Object.keys(spanjoleringen)) {
            let manIsSpanjool = spanjoleringen[sleutel].filter(s => s.ontjoolDatum > Date.now()).length > 0;

            if (manIsSpanjool) {
                spanjolen.push(sleutel);
            }
        }

        for (let i = 0; i < oberSpanjolen.length; i++) {
            let gebruiker = oberSpanjolen[i];

            message.channel.send(`Jij... ${gebruiker.userId}`);

            if (spanjolen.includes(gebruiker.id)) continue;

            message.channel.send(`Jij... ${gebruiker.displayName}`);

            let trekkerRol;
    
            if (gebruiker.roles.cache.has(adminID)) {
                trekkerRol = message.guild.roles.cache.get(stadthouderID);
            } else {
                trekkerRol = message.guild.roles.cache.get(burgerijID);
            }

            gebruiker.roles.add(trekkerRol);
            gebruiker.roles.remove(spanjoolID);

            verlossingenGepleegd++;
        }

        if (verlossingenGepleegd > 0) {
            return message.channel.send(`Er zijn wel ${verlossingenGepleegd} leden weer verlost uit hun lijden (geen spanjool meer dan)`);
        } else {
            return message.channel.send("Alle spanjoleringen op dit moment zijn nog lopende, lekker voor ze.");
        }
	},
};