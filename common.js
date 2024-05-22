const { EmbedBuilder } = require('discord.js');
const dayjs = require('dayjs');
const fs = require('node:fs');
const ms = require('ms');
const { adminID, stadthouderID, burgerijID, spanjoolID, strafkanaalID, logkanaalID, alvaID, kopdichtID, ridderID, clientId } = require('./config.json');
const spanjoleringData = require('./spanjoleringData.json');
const tijdLimiet = 2147483646;
const opmerkingen = [
    "nee tyf op, ik heb hier geen zin in",
    "Ik heb hier geen zin in, jij hebt hier eigenlijk geen zin in. Weet je, we doen het gewoon niet.",
    "Nouh nee",
    "Zoek het effe lekker uit",
    "Gaan we niet doen",
    "Ik dacht het dus even niet, jij wandelend gezwel",
    "ikzitinjemurenikzitinjemurenikzitinjemurenikzitinjemurenikzitinjemurenikzitinjemurenikzitinjemuren",
];

function willekeurigeRolTijd() {
    let ranMin = Math.floor(Math.random() * (210 - 30) + 30);
    return ms(`${ranMin}m`);
}

function geefVoorzetsel() {
    if ((Math.floor(Math.random() * 1000)) == 0) {
        return "Tevens denk je dat yoshi zich schaamt als hij voor mario eieren poept? sorry als ik iemand hiermee beledig maar ik dacht dat het wel grappig was haha. en ik vroeg me af of iemand hier foto's heeft van yoshi die een ei uit poept waarop hij nerveus of verlegen is ik wil het gewoon zien om een beetje te lachen haha.. nog iets dat ik me afvroeg is hoe denk je dat de eieren ruiken haha ik ben gewoon benieuwd wil gewoon een beetje lachen haha ik zou er wel aan willen ruiken";
    }
    
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
        "Zo",
        "Nou dan",
        "Sodeknetter",
        "Potverjandriedubbeltjes",
        "Appelsap",
        "Inshallah",
        "Wahed",
        "Eeeee kaulostrijder",
        "Wat een uitzonderlijk tragedie",
        "O",
        "Ik! Marvin! Maar bovenal",
        "Curieus",
        "Dubieus",
        "Frappant",
        "Vandaag is het een metaforische maandag",
        "Ik trek het niet meer",
    ];

    let ranNum = Math.floor(Math.random() * voorzetsels.length);

    return voorzetsels[ranNum];
}

//let randomNumber = Math.floor(Math.random() * 2);

function verkrijgTijdelijkeRolId(roleChar) {
    switch (roleChar) {
        case "s": return spanjoolID;
        case "a": return alvaID;
        case "k": return kopdichtID;
        case "r": return ridderID;
    }
}

function geefReactieNietMarvin(roleChar) {
    switch (roleChar) {
        case "s": return "Jij denkt dat jij mij kan spanjoleren? Hahahahahahahahah, ga kaas eten man.";
        case "a": return "Als er iets niet lukt door je eigen incompetentie dan moet je het probleem bij jezelf zoeken, niet bij mij.";
        case "k": return "Het is niet de bedoeling dat je meemt met Kop Dicht, al helemaal niet door het aan mij te geven.";
        case "r": return "Ik waardeer het gebaar enorm maar ik ben een robot dus die ridder hoeft echt niet.";
    }
}

function geefReactieKnaapHeeftAlRol(roleChar, memberName) {
    switch (roleChar) {
        case "s": return `Ik snap dat ${memberName} kut is maar het is niet alsof die nu dubbelspanjool wordt ofzo`;
        case "a": return `${memberName} moet wel bijster kut doen als er om dubbele alvist gevraagd wordt, begrijpelijk doch nutteloos.`;
        case "k": return `Wat de neuk heeft ${memberName} geflikt dat één Kop Dicht niet genoeg was, of heeft Paard weer schijt aan zijn strafrollen?`;
        case "r": return `Leuk dat je zo hard aan het simpen bent voor ${memberName} maar meer ridder is onnodig.`;
    }
}

function geefGeenRedenGegevenTekst(roleChar) {
    switch (roleChar) {
        case "s": return "Geen idee waarom precies maar het zal vast terecht zijn.";
        case "a": return "Waarom weet ik niet maar allicht terminaal autistisch gedrag.";
        case "k": return "Beste man moet gewoon zijn muil houden";
        case "r": return "Voor het zijn van een fantastische en merkwaardige figuur";
    }
}

function geefVolledigeRolNaam(roleChar) {
    switch (roleChar) {
        case "s": return "spanjool";
        case "a": return "alvist";
        case "k": return "kop dicht";
        case "r": return "ridder";
    }
}

function geefRolKleur(roleChar) {
    switch (roleChar) {
        case "s": return "Red";
        case "a": return "NotQuiteBlack";
        case "k": return "DarkOrange";
        case "r": return "Gold";
    }
}

function vertaalTijdIndicatie(text) {
    if (text.includes("seconds")) {
        return text.replace("seconds", "seconden");
    } else if (text.includes("second") && !text.includes("seconde")) {
        return text.replace("second", "seconde");
    } else if (text.includes("minutes")) {
        return text.replace("minutes", "minuten");
    } else if (text.includes("minute")) {
        return text.replace("minute", "minuut");
    } else if (text.includes("hours")) {
        return text.replace("hours", "uur");
    } else if (text.includes("hour")) {
        return text.replace("hour", "uur");
    } else if (text.includes("days")) {
        return text.replace("days", "dagen");
    } else if (text.includes("day")) {
        return text.replace("day", "dag");
    } else if (text.includes("weeks")) {
        return text.replace("weeks", "weken");
    } else if (text.includes("months")) {
        return text.replace("months", "maanden");
    } else if (text.includes("month")) {
        return text.replace("month", "maand");
    } else if (text.includes("years")) {
        return text.replace("years", "jaren");
    } else if (text.includes("year")) {
        return text.replace("year", "jaar");
    }

    return text;
}

function slaGegevensOp(data)
{
    console.log("Opslaan...");
    try
    {
        if (data != null)
        {
            fs.writeFile("./spanjoleringData.json", JSON.stringify(data), function (err)
            {
                if (err)
                {
                    console.log(err);
                }

                console.log("Opgeslagen.");
            });
        }
		else
		{
			console.log("Opslaan niet gelukt: data is null");
		}
    }
    catch (ex)
    {
        console.log("Opslaan niet gelukt door onverwachte fout!");
        console.log(ex);
    }
}

function herlaadGegevens()
{
    let data = null;
	
	fs.readFileSync('./spanjoleringData.json', function read (err, data) 
    {
        if (err) 
        {
            data = "{}";
        }
		
        try
        {
            data = JSON.parse(data);
        }
        catch (e)
        {
            if (data == null)
            {
                console.error("Geheugen stuk, :alleskwijt:");
				data = {};
            }
        }
	});
	
	return data;
}

module.exports = {
    klokRol: function(message, args, roleChar) {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);

        const tijdelijkeRollen = [spanjoolID, alvaID, kopdichtID, ridderID];
        const tijdelijkeRol = verkrijgTijdelijkeRolId(roleChar);

        let gebruikersRol;

        const ikMarvin = message.guild.members.cache.find(c => c.id === clientId);
        const persoon = message.mentions.members.first() ?? message.guild.members.cache.find(m => m.username === args[0]);

        if (persoon === undefined) {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }

        if (persoon === ikMarvin) {
            return message.channel.send(geefReactieNietMarvin(roleChar));
        }

        if (persoon.roles.cache.has(tijdelijkeRol)) {
            return message.channel.send(geefReactieKnaapHeeftAlRol(roleChar, persoon.displayName));
        }
        
        if (persoon.roles.cache.has(adminID)) {
            gebruikersRol = message.guild.roles.cache.get(stadthouderID);
        } else {
            gebruikersRol = message.guild.roles.cache.get(burgerijID);
        }

        let tijd;
        let reden;
        let gegevenTijd = args[1];

        if (!gegevenTijd) {
            tijd = willekeurigeRolTijd();
        } else {
            // TODO: Deze moederneukende instelling. Lokaal is het u, gehost is het h.
            if (gegevenTijd.includes('u')) {
                gegevenTijd = gegevenTijd.replace('u', 'h');
            }
            
            tijd = ms(gegevenTijd);

            if (!tijd) {
                tijd = roleChar == 's' ? -1 : willekeurigeRolTijd();
                reden = args.slice(1).join(' ');
            } else if (tijd > tijdLimiet) {
                if (roleChar == 's') {
                    message.channel.send("Dat je het weet, automatisch rol wegnemen gaat hier niet gebeuren want de duur is te lang. Succes ermee!");
                } else {
                    return message.channel.send("Geloof me, ik had het ook machtig gevonden maar hij wilt gewoon niet langer, soms is het gewoon zo.");
                }
            } else {
                reden = args.slice(2).join(' ');
            }
        }
		
		if (reden === undefined) {
            reden = geefGeenRedenGegevenTekst(roleChar);
        }

        if (reden.length > 1024) {
            reden = reden.slice(0, 1021) + '...';
        }

        let aantalSpanjoleringen = 0;

		if (roleChar == 's')
		{
			let maand = 2592000000; //30 dagen = 2592000000 ms

            let spanjoleringen = [];

            if (spanjoleringData[persoon.id]) {
                spanjoleringen = spanjoleringData[persoon.id].filter((spanjolering) =>
                    spanjolering.datum > Date.now() - maand
                ) || [];
            } else {
                spanjoleringData[persoon.id] = [];
            }
			
			aantalSpanjoleringen = spanjoleringen.length;
			
			let aantalSpanjoleringen = spanjoleringen.length;
			
			if (time < 0)
			{
                time = 600000 * aantalSpanjoleringen * aantalSpanjoleringen; //600000ms = 10 minuten
            }
            
            time *= Math.random()
            time += 600000 + (Math.random() * 6000000) //standaard 10 minuten plus een uur willekeur voor Paard
			
            try {
                spanjoleringData[persoon.id].push(
                    {
                        datum: Date.now(),
                        ontjoolDatum: Date.now() + tijd,
                        reden: reden,
                        gebruikerId: persoon.id,
                        gebruikerNaam: persoon.displayName
                    });
                    
                slaGegevensOp(spanjoleringData);
            } catch (err) {
                console.error(err);
                return message.channel.send('jezus, welke mislukte anjer heeft mij geschreven. Er ging iets mis.');
            }
		}

        let duurEnglish = `**${ms(tijd, { long: true })}**`;
        let duur = vertaalTijdIndicatie(duurEnglish);

        tijdelijkeRollen.forEach((roleID) => {
            if (persoon.roles.cache.has(roleID)) {
                let role = message.guild.roles.cache.get(roleID);
                try {
                    persoon.roles.remove(role);
                } catch (err) {
                    console.error(`Kon ${role} niet verwijderen! ${err}`);
                }
            }
        });

        try {
            persoon.roles.add(tijdelijkeRol);
            persoon.roles.remove(gebruikersRol);
        } catch (err) {
            console.error(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }

        let voetTekst = message.member.displayName;

        if (aantalSpanjoleringen > 0) {
            voetTekst = voetTekst + ` ${aantalSpanjoleringen}`;
        }

        let verlossingsMoment = dayjs(Date.now() + tijd);

        const klokInformatieEmbed = new EmbedBuilder()
            .setColor(geefRolKleur(roleChar))
            .setTitle(`${persoon.displayName} is ${geefVolledigeRolNaam(roleChar)} voor ${duur}`)
            .addFields(
                { name: 'Reden', value: reden },
                { name: 'Verlossingsdatum', value: verlossingsMoment.format("DD-MM-YYYY") },
                { name: 'Vrijheidstijd', value: verlossingsMoment.format("HH:mm") }
            )
            .setTimestamp()
            .setFooter({ text: voetTekst, iconURL: message.author.displayAvatarURL() });

        message.react('👌');

        message.channel.send(`${geefVoorzetsel()}, ${persoon.displayName} heeft nu ${geefVolledigeRolNaam(roleChar)} voor ${duur}`);

        try {
            logKanaal.send({ embeds: [klokInformatieEmbed] });
            
            strafKanaal
                .send({ embeds: [klokInformatieEmbed] })
                .then(msg => {
                    if (tijd < tijdLimiet) {
                        setTimeout(() => {
                            msg.delete();
                        }, tijd);
                    }
                })
                .catch(err => {
                    logKanaal.send("Strafbericht kon niet verwijderd worden");
                    console.error(err);
                });
        } catch (err) {
            message.channel.send("Dat je het weet, het ging niet zo lekker met meldinkje toevoegen in een logkanaal.");
            console.error(err);
        }

        if (tijd < tijdLimiet) {
            setTimeout(() => {
                persoon.roles.add(gebruikersRol);
                persoon.roles.remove(tijdelijkeRol);
            }, tijd);
        }
    },
    ontKlokRol: function(message, roleChar) {
		const logKanaal = message.client.channels.cache.get(logkanaalID);
        const tijdelijkeRol = verkrijgTijdelijkeRolId(roleChar);

        function verwijderRolVoorLid(lid) {
            if (!lid) {
                logKanaal.send(`Kon lid ${lid} niet vinden, oei!`);
            } else {
                let gebruikersRol;
                
                if (lid.roles.cache.has(adminID)) {
                    gebruikersRol = message.guild.roles.cache.get(stadthouderID);
                } else {
                    gebruikersRol = message.guild.roles.cache.get(burgerijID);
                }

                lid.roles.add(gebruikersRol);
                lid.roles.remove(tijdelijkeRol);
            }
        }

        try {
            const members = message.mentions.members;
            members.each(verwijderRolVoorLid);
            message.react('👌');
        } catch (err) {
            console.error(err);
            return message.channel.send("Ja dat ging dus niet helemaal lekker, rollen afnemen is een tikje mislukt.");
        }
    },
    schrijfData: function(message, nieuweData) {
        try {
            slaGegevensOp(nieuweData);
            herlaadGegevens();
        } catch (err) {
            console.error(err);
            return message.channel.send("Oef autsj, wegschrijven van de nieuwe gegevens ging dus niet goed.");
        }
    },
    bijdehanteOpmerking: function() {
        let nummertje = Math.floor(Math.random() * opmerkingen.length);
        return voorzetsels[nummertje];
    }
};