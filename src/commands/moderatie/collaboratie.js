import dayjs from "dayjs";

const tijdLimiet = 2147483646;

export default {
	name: 'collaboratie',
    description: 'Ter controle of er enkele spanjolen aan hun straf ontkomen zijn',
    admin: true,
	execute(message) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        
        let spanjoleringen = require('../../spanjoleringData.json');

        if (!spanjoleringen) return;

        let ontsnappingenGesnapt = 0;
        let gebruikersOverTermijn = false;

        for (var sleutel of Object.keys(spanjoleringen)) {
            let manIsSpanjool = spanjoleringen[sleutel].filter(s => s.ontjoolDatum > Date.now()).length > 0;

            if (manIsSpanjool) {
                try {
                    let spanjaard;

                    const member = message.guild.members.cache.find(member => member.id === sleutel);

                    if (!member) break;

                    spanjoleringen[sleutel]
                        .filter(s => s.ontjoolDatum > Date.now())
                        .forEach(element => {
                            if (!spanjaard || element.datum > spanjaard.datum) {
                                spanjaard = element;
                            }
                        });
                    
                    let tijdOver = spanjaard.ontjoolDatum - Date.now();

                    let trekker = message.guild.members.cache.find(m => m.id === spanjaard.gebruikerId);
    
                    if (!trekker || !tijdOver || trekker.roles.cache.has(process.env.SPANJOOL_ID)) continue;
    
                    let trekkerRol;
    
                    if (trekker.roles.cache.has(process.env.ADMIN_ID)) {
                        trekkerRol = message.guild.roles.cache.get(process.env.STADTHOUDER_ID);
                    } else {
                        trekkerRol = message.guild.roles.cache.get(process.env.BURGERIJ_ID);
                    }
    
                    member.roles.add(process.env.SPANJOOL_ID);
                    member.roles.remove(trekkerRol);
    
                    if (tijdOver < tijdLimiet) {
                        setTimeout(() => {
                            member.roles.add(trekkerRol);
                            member.roles.remove(spanjoolID);
                        }, tijdOver);
                    } else {
                        gebruikersOverTermijn = true;
                    }
                    
                    var leesbareTijd = dayjs(spanjaard.ontjoolDatum).format("DD-MM-YYYY HH:mm");

                    logKanaal.send(`Welnu! ${member.displayName} heeft wederom weer spanjool tot ${leesbareTijd}`);
    
                    ontsnappingenGesnapt++;
                } catch (err) {
                    console.error(err);
                    return message.channel.send("auwie, dat deed pijn");
                }
            }
        }

        if (gebruikersOverTermijn) {
            message.channel.send("Tevens, sommige gebruikers zijn nog zo lang spanjool dat je die zelf bij mag gaan houden, joe joe!");
        }

        return message.channel.send(`Hoppa, ${ontsnappingenGesnapt} gluiperd(s) weer gegeven wat ze verdienen, gna gna.`);
	},
};