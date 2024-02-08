const { adminID, stadthouderID, burgerijID, spanjoolID } = require('../../config.json');

module.exports = {
	name: 'collaboratie',
    description: 'Ter controle of er enkele spanjolen aan hun straf ontkomen zijn',
    admin: true,
	execute(message) {
        let spanjoleringen = require('../../spanjoleringData.json');

        if (!spanjoleringen) return;

        var huidigeSpanjolen = spanjoleringen.filter(s => s.ontjoolDatum > Date.now());

        if (!huidigeSpanjolen.length > 0) return;

        let ontsnappingenGesnapt = 0;

        for (let i = 0; i < huidigeSpanjolen.length; i++) {
            let spanjaard = huidigeSpanjolen[i];

            let tijdOver = spanjaard.ontjoolDatum - Date.now();

            let trekker = message.guild.members.cache.find(m => m.id === spanjaard.gebruikerId);

            if (!trekker || !tijdOver || trekker.roles.cache.has(spanjoolID)) continue;

            let trekkerRol;

            if (trekker.roles.cache.has(adminID)) {
                trekkerRol = message.guild.roles.cache.get(stadthouderID);
            } else {
                trekkerRol = message.guild.roles.cache.get(burgerijID);
            }

            member.roles.add(spanjoolID);
            member.roles.remove(trekkerRol);

            setTimeout(() => {
                member.roles.add(trekkerRol);
                member.roles.remove(spanjoolID);
            }, tijdOver);

            ontsnappingenGesnapt++;
        }

        return message.channel.send(`Hotseflotse, ${ontsnappingenGesnapt} toch maar weer even hun straf gegeven, gna gna.`);
	},
};