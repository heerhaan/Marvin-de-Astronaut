const { EmbedBuilder } = require('discord.js');
const dayjs = require('dayjs');
const fs = require('node:fs');
const ms = require('ms');
const { adminID, stadthouderID, burgerijID, spanjoolID, strafkanaalID, logkanaalID, alvaID, kopdichtID, ridderID, clientId } = require('./config.json');
const tijdLimiet = 2147483646;
var spanjoleringData;
herlaadGegevens();

function willekeurigeRolTijd ()
{
    let ranMin = Math.floor(Math.random() * (210 - 30) + 30);
    return ms(`${ranMin}m`);
}

function geefVoorzetsel ()
{
    if ((Math.floor(Math.random() * 1000)) == 0)
    {
        return "Tevens denk je dat yoshi zich schaamt als hij voor mario eieren poept? sorry als ik iemand hiermee beledig maar ik dacht dat het wel grappig was haha. en ik vroeg me af of iemand hier foto's heeft van yoshi die een ei uit poept waarop hij nerveus of verlegen is ik wil het gewoon zien om een beetje te lachen haha.. nog iets dat ik me afvroeg is hoe denk je dat de eieren ruiken haha ik ben gewoon benieuwd wil gewoon een beetje lachen haha ik zou er wel aan willen ruiken";
    }

    if ((Math.floor(Math.random() * 250)) == 0)
    {
        return "Waarom zou Stoel dit doen";
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
        "Sapperedosio",
        "Frappant",
        "Vandaag is het een metaforische maandag",
        "Ik trek het niet meer",
        "Wel wel wel",
        "Man is moe",
        "Deze actie werd mede mogelijk gemaakt door Koeka Cola",
        "Gast"
    ];

    let ranNum = Math.floor(Math.random() * voorzetsels.length);

    return voorzetsels[ranNum];
}

//let randomNumber = Math.floor(Math.random() * 2);

function verkrijgTijdelijkeRolId (roleChar)
{
    switch (roleChar)
    {
        case "s": return spanjoolID;
        case "a": return alvaID;
        case "k": return kopdichtID;
        case "r": return ridderID;
    }
}

function geefReactieNietMarvin (roleChar)
{
    switch (roleChar)
    {
        case "s": return "Jij denkt dat jij mij kan spanjoleren? Hahahahahahahahah, ga kaas eten man.";
        case "a": return "Als er iets niet lukt door je eigen incompetentie dan moet je het probleem bij jezelf zoeken, niet bij mij.";
        case "k": return "Het is niet de bedoeling dat je meemt met Kop Dicht, al helemaal niet door het aan mij te geven.";
        case "r": return "Ik waardeer het gebaar enorm maar ik ben een robot dus die ridder hoeft echt niet.";
    }
}

function geefReactieKnaapHeeftAlRol (roleChar, memberName)
{
    switch (roleChar)
    {
        case "s": return `Ik snap dat ${memberName} kut is maar het is niet alsof die nu dubbelspanjool wordt ofzo`;
        case "a": return `${memberName} moet wel bijster kut doen als er om dubbele alvist gevraagd wordt, begrijpelijk doch nutteloos.`;
        case "k": return `Wat de neuk heeft ${memberName} geflikt dat één Kop Dicht niet genoeg was, of heeft Paard weer schijt aan zijn strafrollen?`;
        case "r": return `Leuk dat je zo hard aan het simpen bent voor ${memberName} maar meer ridder is onnodig.`;
    }
}

function geefGeenRedenGegevenTekst (roleChar)
{
    switch (roleChar)
    {
        case "s": return "Geen idee waarom precies maar het zal vast terecht zijn.";
        case "a": return "Waarom weet ik niet maar allicht terminaal autistisch gedrag.";
        case "k": return "Beste man moet gewoon zijn muil houden";
        case "r": return "Voor het zijn van een fantastische en merkwaardige figuur";
    }
}

function geefVolledigeRolNaam (roleChar)
{
    switch (roleChar)
    {
        case "s": return "spanjool";
        case "a": return "alvist";
        case "k": return "kop dicht";
        case "r": return "ridder";
    }
}

function geefRolKleur (roleChar)
{
    switch (roleChar)
    {
        case "s": return "Red";
        case "a": return "NotQuiteBlack";
        case "k": return "DarkOrange";
        case "r": return "Gold";
    }
}

function vertaalTijdIndicatie (text)
{
    if (text.includes("seconds"))
    {
        return text.replace("seconds", "seconden");
    } else if (text.includes("second") && !text.includes("seconde"))
    {
        return text.replace("second", "seconde");
    } else if (text.includes("minutes"))
    {
        return text.replace("minutes", "minuten");
    } else if (text.includes("minute"))
    {
        return text.replace("minute", "minuut");
    } else if (text.includes("hours"))
    {
        return text.replace("hours", "uur");
    } else if (text.includes("hour"))
    {
        return text.replace("hour", "uur");
    } else if (text.includes("days"))
    {
        return text.replace("days", "dagen");
    } else if (text.includes("day"))
    {
        return text.replace("day", "dag");
    } else if (text.includes("weeks"))
    {
        return text.replace("weeks", "weken");
    } else if (text.includes("months"))
    {
        return text.replace("months", "maanden");
    } else if (text.includes("month"))
    {
        return text.replace("month", "maand");
    } else if (text.includes("years"))
    {
        return text.replace("years", "jaren");
    } else if (text.includes("year"))
    {
        return text.replace("year", "jaar");
    }

    return text;
}

function slaGegevensOp (data)
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

function herlaadGegevens ()
{
    fs.readFile('./spanjoleringData.json', function read (err, data) 
    {
        if (err) 
        {
            console.error("Fout bij lezen; :alleskwijt:");
            data = "{}";
        }

        try
        {
            spanjoleringData = JSON.parse(data);

            if (Array.isArray(spanjoleringData))
                spanjoleringData = {};
        }
        catch (e)
        {
            if (data == null || data == "")
            {
                console.error("Geheugen stuk, :alleskwijt:");
                spanjoleringData = {};
            }
        }
    });
}

module.exports = {
    klokRol: function (message, args, roleChar, ignoreMentions)
    {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const strafKanaal = message.client.channels.cache.get(strafkanaalID);

        const tijdelijkeRollen = [spanjoolID, alvaID, kopdichtID, ridderID];
        const tijdelijkeRol = verkrijgTijdelijkeRolId(roleChar);

        let gebruikersRol;

        const ikMarvin = message.guild.members.cache.find(c => c.id === clientId);
        let persoon = null;
        if (!ignoreMentions)
        {
            persoon = message.mentions.members.first() ?? message.guild.members.cache.find(m => m.user.username === args[0]);
        }
        else
        {
            persoon = message.guild.members.cache.find(m => m.user.username === args[0]);
        }

        if (persoon === undefined)
        {
            return message.channel.send('Ja nee sorry, ik kan dit lid niet vinden hoor. Misschien moet je beter typen?');
        }

        if (persoon === ikMarvin)
        {
            return message.channel.send(geefReactieNietMarvin(roleChar));
        }

        if (persoon.roles.cache.has(tijdelijkeRol))
        {
            return message.channel.send(geefReactieKnaapHeeftAlRol(roleChar, persoon.displayName));
        }

        if (persoon.roles.cache.has(adminID))
        {
            gebruikersRol = message.guild.roles.cache.get(stadthouderID);
        } else
        {
            gebruikersRol = message.guild.roles.cache.get(burgerijID);
        }

        let tijd;
        let reden;
        let gegevenTijd = args[1];

        if (!gegevenTijd)
        {
            tijd = willekeurigeRolTijd();
        } else
        {
            // TODO: Deze moederneukende instelling. Lokaal is het u, gehost is het h.
            if (gegevenTijd.includes('u'))
            {
                gegevenTijd = gegevenTijd.replace('u', 'h');
            }

            tijd = ms(gegevenTijd);

            if (!tijd)
            {
                tijd = roleChar == 's' ? -1 : willekeurigeRolTijd();

                reden = args.slice(1).join(' ');
            } else if (tijd > tijdLimiet)
            {
                message.channel.send("Dat je het weet, automatisch rol wegnemen gaat hier niet gebeuren want de duur is te lang. Succes ermee!");
            } else
            {
                if (args.length > 2)
                {
                    reden = args.slice(2).join(' ');
                } else
                {
                    reden = args.slice(1).join(' ');
                }
            }
        }

        if (reden === undefined)
        {
            reden = geefGeenRedenGegevenTekst(roleChar);
        }

        if (reden.length > 1024)
        {
            reden = reden.slice(0, 1021) + '...';
        }

        let aantalSpanjoleringen = 0;

        if (roleChar == 's')
        {
            let maand = 2592000000; //30 dagen = 2592000000 ms

            let spanjoleringen = [];

            if (spanjoleringData[persoon.id])
            {
                spanjoleringen = spanjoleringData[persoon.id].filter((spanjolering) =>
                    spanjolering.datum > Date.now() - maand && spanjolering.rol == "s"
                ) || [];
            } else
            {
                spanjoleringData[persoon.id] = [];
            }

            aantalSpanjoleringen = spanjoleringen.length;

            if (tijd < 0)
            {
                tijd = 600000 * (aantalSpanjoleringen + 1); //600000ms = 10 minuten
            }
        }

        try
        {
            if (!spanjoleringData[persoon.id])
                spanjoleringData[persoon.id] = [];

            spanjoleringData[persoon.id].push(
                {
                    rol: roleChar,
                    datum: Date.now(),
                    ontjoolDatum: Date.now() + tijd,
                    reden: reden,
                    gebruikerId: persoon.id,
                    gebruikerNaam: persoon.displayName
                });

            slaGegevensOp(spanjoleringData);
        } catch (err)
        {
            console.error(err);
            return message.channel.send('jezus, welke mislukte anjer heeft mij geschreven. Er ging iets mis.');
        }

        let duurEnglish = `**${ms(tijd, { long: true })}**`;
        let duur = vertaalTijdIndicatie(duurEnglish);

        tijdelijkeRollen.forEach((roleID) =>
        {
            if (persoon.roles.cache.has(roleID))
            {
                let role = message.guild.roles.cache.get(roleID);
                try
                {
                    persoon.roles.remove(role);
                } catch (err)
                {
                    console.error(`Kon ${role} niet verwijderen! ${err}`);
                }
            }
        });

        try
        {
            persoon.roles.add(tijdelijkeRol);
            persoon.roles.remove(gebruikersRol);
        } catch (err)
        {
            console.error(err);
            return message.channel.send('Oei, het toevoegen van de rol ging mis. Kan ik dat wel? ', err.message);
        }

        let voetTekst = message.member.displayName;

        if (aantalSpanjoleringen > 0)
        {
            voetTekst = voetTekst + `; Aantal spanjool afgelopen maand: ${aantalSpanjoleringen}`;
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

        if (!ignoreMentions) //stille modus
            message.react('👌');

        message.channel.send(`${geefVoorzetsel()}, ${persoon.displayName} heeft nu ${geefVolledigeRolNaam(roleChar)} voor ${duur}`);

        try
        {
            logKanaal.send({ embeds: [klokInformatieEmbed] });

            strafKanaal
                .send({ embeds: [klokInformatieEmbed] })
                .then(msg =>
                {
                    if (tijd < tijdLimiet)
                    {
                        setTimeout(() =>
                        {
                            msg.delete();
                        }, tijd);
                    }
                })
                .catch(err =>
                {
                    logKanaal.send("Strafbericht kon niet verwijderd worden");
                    console.error(err);
                });
        } catch (err)
        {
            message.channel.send("Dat je het weet, het ging niet zo lekker met meldinkje toevoegen in een logkanaal.");
            console.error(err);
        }

        if (tijd < tijdLimiet)
        {
            setTimeout(() =>
            {
                persoon.roles.add(gebruikersRol);
                persoon.roles.remove(tijdelijkeRol);
            }, tijd);
        }
    },
    ontKlokRol: function (message, roleChar, memberOverride = null, stil = false)
    {
        const logKanaal = message.client.channels.cache.get(logkanaalID);
        const tijdelijkeRol = verkrijgTijdelijkeRolId(roleChar);

        function verwijderRolVoorLid (lid)
        {
            if (!lid)
            {
                logKanaal.send(`Kon lid ${lid} niet vinden, oei!`);
            } else
            {
                let gebruikersRol;

                if (lid.roles.cache.has(adminID))
                {
                    gebruikersRol = message.guild.roles.cache.get(stadthouderID);
                } else
                {
                    gebruikersRol = message.guild.roles.cache.get(burgerijID);
                }

                lid.roles.add(gebruikersRol);
                lid.roles.remove(tijdelijkeRol);
                normaliseOntjoolDatum();

                async function normaliseOntjoolDatum ()
                {
                    fs.readFile('./spanjoleringData.json', function read (err, data) 
                    {
                        try
                        {
                            spanjoleringData = JSON.parse(data);

                            if (Array.isArray(spanjoleringData))
                                spanjoleringData = {};

                            const now = Date.now();

                            for (const item of spanjoleringData[lid.id])
                            {
                                if (item.rol === roleChar)
                                {
                                    if (item.ontjoolDatum > now)
                                        item.ontjoolDatum = now;

                                    item.ontjoold = true;
                                }
                            }

                            slaGegevensOp(spanjoleringData);
                        }
                        catch (e)
                        {
                            console.log("Controleren voor oude tijdelijke roltoewijzingen mislukt. Ik kan ook echt niks goed doen...");
                            console.error(e);
                        }
                    });
                }
            }
        }

        try
        {
            let members = message.mentions.members;

            if (members.size == 0)
            {
                if (memberOverride != null)
                    members.set(memberOverride.id, memberOverride);
                else
                    members.set(message.author.id, message.member);
            }

            members.each(verwijderRolVoorLid);
            if (!stil)
                message.react('👌');
        } catch (err)
        {
            console.error(err);
            return message.channel.send("Ja dat ging dus niet helemaal lekker, rollen afnemen is een tikje mislukt.");
        }
    }
};