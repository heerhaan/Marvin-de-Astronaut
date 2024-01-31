const ms = require('ms');
const { adminID, stadthouderID, burgerijID, spanjoolID, strafkanaalID, logkanaalID, alvaID, kopdichtID, ridderID } = require('./config.json');

function randomRoleTime() {
    let ranMin = Math.floor(Math.random() * (210 - 30) + 30);
    return ms(`${ranMin}m`);
}

function geefVoorzetsel() {
    var voorzetsels = [
        "Hatseflats",
        "Hoppakee",
        "Huts",
        "Ayooo",
        "Wajo",
        "Wejo",
        "Bam",
        "Hoppa",
        "Yoooo",
        "Mwoah",
        "Bwoah",
    ];

    let ranNum = Math.floor(Math.random() * voorzetsels.length);

    return voorzetsels[ranNum];
}

function examplePlaceholderRoleChar(roleChar) {
    //var random = Math.floor(Math.random() * 2);
    switch (roleChar) {
        case "s": return "";
        case "a": return "";
        case "k": return "";
        case "r": return "";
    }
}

function getTimedRoleId(roleChar) {
    switch (roleChar) {
        case "s": return spanjoolID;
        case "a": return alvaID;
        case "k": return kopdichtID;
        case "r": return ridderID;
    }
}

function getResponseNotMarvin(roleChar) {
    switch (roleChar) {
        case "s": return "Jij denkt dat jij mij kan spanjoleren? Hahahahahahahahah, ga kaas eten man.";
        case "a": return "Als er iets niet lukt door je eigen incompetentie dan moet je het probleem bij jezelf zoeken, niet bij mij.";
        case "k": return "Het is niet de bedoeling dat je meemt met Kop Dicht, al helemaal niet door het aan mij te geven.";
        case "r": return "Ik waardeer het gebaar enorm maar ik ben een robot dus die ridder hoeft echt niet.";
    }
}

function getResponseBlokeAlreadyHasRole(roleChar, memberName) {
    switch (roleChar) {
        case "s": return `Ik snap dat ${memberName} kut is maar het is niet alsof die nu dubbelspanjool wordt ofzo`;
        case "a": return `${memberName} moet wel bijster kut doen als er om dubbele alvist gevraagd wordt, begrijpelijk doch nutteloos.`;
        case "k": return `Wat de neuk heeft ${memberName} geflikt dat één Kop Dicht niet genoeg was, of heeft Paard weer schijt aan zijn strafrollen?`;
        case "r": return `Leuk dat je zo hard aan het simpen bent voor ${memberName} maar meer ridder is onnodig.`;
    }
}

function getNoReasonGivenPlaceholder(roleChar) {
    switch (roleChar) {
        case "s": return "Geen idee waarom precies maar het zal vast terecht zijn.";
        case "a": return "Waarom weet ik niet maar allicht terminaal autistisch gedrag.";
        case "k": return "Beste man moet gewoon zijn muil houden";
        case "r": return "Voor het zijn van een fantastische en merkwaardige figuur";
    }
}

function getFullRoleName(roleChar) {
    switch (roleChar) {
        case "s": return "spanjool";
        case "a": return "alvist";
        case "k": return "kop dicht";
        case "r": return "ridder";
    }
}

function translateTimeIndicator(text) {
    if (text.includes("seconds")) {
        return text.replace("seconds", "seconden");
    } else if (text.includes("second")) {
        return text.replace("second", "seconde");
    } else if (text.includes("minutes")) {
        return text.replace("minutes", "minuten");
    } else if (text.includes("minute")) {
        return text.replace("minute", "minuut");
    } else if (text.includes("hours")) {
        return text.replace("hours", "uren");
    } else if (text.includes("hour")) {
        return text.replace("hour", "uur");
    } else if (text.includes("days")) {
        return text.replace("days", "dagen");
    } else if (text.includes("day")) {
        return text.replace("day", "dag");
    }

    return text;
}

module.exports = {
    timedRole: function(message, args, roleChar) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);

        const timeableRoles = [spanjoolID, alvaID, kopdichtID, ridderID];
        const timedRole = getTimedRoleId(roleChar);

        let userRole;

        const member = message.mentions.members.first() ?? message.guild.members.cache.find(member => member.username === args[0]);
        
        //return message.channel.send(`Zo, je probeerde dus ${member.displayName} ${getFullRoleName(roleChar)} te geven, curieus`);

        if (!member) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }

        if (member === message.guild.me) {
            return message.channel.send(getResponseNotMarvin(roleChar));
        }

        if (member.roles.cache.has(timedRole)) {
            return message.channel.send(getResponseBlokeAlreadyHasRole(roleChar, member.displayName));
        }
        
        if (member.roles.cache.has(adminID)) {
            userRole = message.guild.roles.cache.get(stadthouderID);
        } else {
            userRole = message.guild.roles.cache.get(burgerijID);
        }

        let time;
        let reden;

        if (!args[1]) {
            time = randomRoleTime();
        } else {
            time = ms(args[1]);

            if (time > 1209600000) {
                // Maximum op 14 dagen want langer dan dat vindt de app niet leuk
                return message.channel.send('Zou top zijn als de ingevoerde tijd niet zo ontieglijk lang was (minder dan 14 dagen aub).');
            } else if (!time) {
                time = randomRoleTime();
                reden = args.slice(1).join(' ');
            } else {
                reden = args.slice(2).join(' ');
            }
        }

        let duurEnglish = `**${ms(time, { long: true })}**`;
        let duur = translateTimeIndicator(duurEnglish);

        if (!reden) {
            reden = getNoReasonGivenPlaceholder(roleChar);
        }

        if (reden.length > 1024) {
            reden = reden.slice(0, 1021) + '...';
        }

        timeableRoles.forEach((roleID) => {
            if (member.roles.cache.has(roleID)) {
                let role = message.guild.roles.cache.get(roleID);
                try {
                    member.roles.remove(role);
                } catch (err) {
                    console.error(`Kon ${role} niet verwijderen! ${err}`);
                }
            }
        });

        try {
            member.roles.add(timedRole);
            member.roles.remove(userRole);
        } catch (err) {
            console.error(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }

        /*const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName} is spanjool voor ${duur}`)
            .addField('Reden', reden)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);

        strafKanaal
            .send({ embeds: [muteEmbed] })
            .then(msg => {
                msg.delete({timeout: time}).catch(catchErr)
            })
            .catch(logKanaal.send("Strafbericht kon niet verwijderd worden"));
        */

        message.react('👌');

        var meldingTekst = `${geefVoorzetsel()}, ${member.displayName} heeft nu ${getFullRoleName(roleChar)} voor ${duur}`;

        message.channel.send(meldingTekst);

        try {
            strafKanaal.send(meldingTekst);
            logKanaal.send(`${member.displayName} ${getFullRoleName(roleChar)} voor ${duur}`);
        } catch (err) {
            message.channel.send("Dat je het weet, het ging niet zo lekker met meldinkje toevoegen in een logkanaal.");
        }

        setTimeout(() => {
            member.roles.add(userRole);
            member.roles.remove(timedRole);
        }, time);
    },
    yoinkTimedRole: function(message, roleChar) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const timedRole = getTimedRoleId(roleChar);

        function removeRoleForMember(member) {
            if (!member) {
                logKanaal.send(`Kon lid ${member} niet vinden, oei!`);
            }
            else {
                let userRole;
                
                if (member.roles.cache.has(adminID)) {
                    userRole = message.guild.roles.cache.get(stadthouderID);
                } else {
                    userRole = message.guild.roles.cache.get(burgerijID);
                }

                member.roles.add(userRole);
                member.roles.remove(timedRole);
            }
        }

        try {
            const members = message.mentions.members;
            members.each(removeRoleForMember);
            message.react('👌');
        } catch (err) {
            message.channel.send("Ja dat ging dus niet helemaal lekker, rollen afnemen is een tikje mislukt.");
            console.error(err);
        }
    }
};