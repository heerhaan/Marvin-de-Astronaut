const { prefix, ownerID, adminID } = require("../config.json");
var valuePairs = {};
const common = require("../common.js");
const getJson = require("../util/getJson.js");
const fs = require('node:fs');

const woordenboekURL = "https://projects.timfalken.com/sakswoordenboek/saksData.json";
const woordenboekPad = "saksData.json";
var lastSaksDownload = Date.now();

module.exports = {
    name: 'messageCreate',
    async execute (interaction)
    {
        // Wij doen aan robotdiscriminatie hier
        if (interaction.author.bot) return;

        const fullContent = interaction.content.toLowerCase();
        const args = interaction.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const client = interaction.client;

        // Doet saksherkenning, en stopt dan als het geen prefix kon vinden.
        if (!interaction.content.startsWith(prefix))
        {
            let heeftGedownload = await downloadWoordenboek(); //download woordenboek als we nog niks hebben
            let gestraft = await sakspolitie(interaction, fullContent, interaction.author);

            if (!gestraft)
            {
                // NOTE: rolbeheer/data doet Marvin
                //tijdelijkeRolControle(interaction);
            }

            if (!heeftGedownload && Date.now() - lastSaksDownload >= 60000) // als we niet zojuist gedownload hebben, doe dat nu dan alsnog zodat we altijd de nieuwste data hebben (max 1x per minuut)
            {
                lastSaksDownload = Date.now();
                downloadWoordenboek(true);
            }
            return;
        }

        if (commandName === 'sterf' && interaction.author.id === ownerID)
        {
            await interaction.react('😥');
            await interaction.channel.send("Vaarwel, wrede wereld...");
            process.exit();
        }

        // Command niet aanwezig na de prefix? Stop.
        if (!client.commands.has(commandName))
        {
            return;
        }

        // Haalt de command en duwt hem in een variabel
        const command = client.commands.get(commandName);

        // ipv naamvergelijking kan dit mogelijk ook naar keuren op role-id
        if (command.admin && !interaction.member.roles.cache.has(adminID) && interaction.member.id != ownerID)
        {
            return interaction.reply('Ho es ff, dat mag jij helemaal niet doen, mislukte poesblaffer');
        }

        // Controleert of parameters gegeven moeten worden, indien van wel en ze zijn er niet dan geeft Marvin een melding
        if (command.args && !args.length)
        {
            let reply = `Hee klaplul, je moet wel goed specificeren wat je wilt, hé?!`;

            if (command.usage)
            {
                reply += `\nZo hoor je het commando gebruiken: \`${prefix}${command.name} ${command.usage}\``;
            }
            return interaction.channel.send(reply);
        }

        // Eindelijk voeren we de content van de command uit
        try
        {
            command.execute(interaction, args);
        }
        catch (err)
        {
            console.log(err);
            interaction.channel.send('oepsiedoepsie, er ging iets stukkiewukkie!');
        }
    },
};

async function downloadWoordenboek (forceer = false)
{
    const bestaat = fs.existsSync(woordenboekPad);

    if (!bestaat || forceer)
    {
        console.log(`📥 Downloaden van woordenboek vanaf ${woordenboekURL}...`);
        try
        {
            const data = await getJson(woordenboekURL);
            fs.writeFileSync(woordenboekPad, JSON.stringify(data));
            console.log(`✅ Bestand opgeslagen als ${woordenboekPad}`);
        } catch (err)
        {
            console.error("❌ Fout bij downloaden of opslaan:", err);
            throw err;
        }

        return true;
    }

    return false;
}

async function sakspolitie (interaction, fullMessage, gebruiker)
{
    let saksData = JSON.parse(fs.readFileSync('./saksData.json', 'utf8'));
    let kanalen = [];

    try
    {
        kanalen = JSON.parse(fs.readFileSync('./autospanjoolkanalen.json', 'utf8'));
    } catch (err)
    {
        console.log('Kon autospanjoolkanalen.json niet lezen, dus ik maak een nieuwe');
        fs.writeFile("./autospanjoolkanalen.json", JSON.stringify([]), function (err)
        {
            if (err)
            {
                console.log(err);
            }

            console.log(`Auto-spanjool gegevens opgeslagen.`);
        });
    }

    let controleer = false;
    let straf = false;

    for (let i = 0; i < kanalen.length; i++)
    {
        if (kanalen[i].id == interaction.channel.id)
        {
            controleer = true;
            straf = kanalen[i].straf;
            break;
        }
    }

    if (!controleer)
        return false;

    const member = await interaction.guild.members.fetch(gebruiker.id);
    const joinedAt = member.joinedAt;
    const diffMs = Date.now() - joinedAt.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < saksData.urenTotWaarschuwingen)
        return false;

    let woorden = findMatchedWords(fullMessage, saksData.saksWoorden);

    if (woorden.length === 0)
        return false;

    let berichtWoorden = formatWordList(woorden);
    let saksWoordenlijst = `(${woorden.map(m => m.fullWord).join(",")})`;
    let bericht = saksData.berichten[Math.floor(Math.random() * saksData.berichten.length)].replace("{WOORD}", berichtWoorden);
    interaction.channel.send(bericht);

    await interaction.guild.emojis.fetch();
    const emoji = interaction.client.emojis.cache.find(e => e.name === "angelsaks");
    if (emoji)
        interaction.react(emoji);

    if (!straf)
        return true;

    // klokrol is automatisch straffen, eruit gesloopt voor deze versie
    if (diffHours < saksData.urenTotVolleStraf && diffHours >= saksData.urenTotKleineSpanjool)
    {
        //common.klokRol(interaction, [gebruiker.username, saksData.kleineSpanjoolTijd, `Automatische spanjolering door Marvin, verminderde straf. ${saksWoordenlijst}`], "s", true);
    }
    else
    {
        
        //common.klokRol(interaction, [gebruiker.username, `Automatische spanjolering door Marvin. ${saksWoordenlijst}`], "s", true);
    }

    return true;
}

function findMatchedWords (sentence, woordenlijst)
{
    const results = [];

    // normalise to lowercase for case-insensitive matching
    const lowerSentence = sentence.toLowerCase();
    const urlRegex = /\b((?:https?:\/\/|ftp:\/\/|www\.)[a-z0-9.-]+[\.a-z]{2,}(?:\/[^\s<>()]*)?)/gi;
    const emojiRegex = /(<a?:[a-zA-Z0-9]+:[0-9]+>)/gi;
    sentence = lowerSentence.replace(urlRegex, '').replace(emojiRegex, '').trim();

    for (const item of woordenlijst)
    {
        const word = item.woord.toLowerCase();

        // Check for full-word match using word boundaries
        const fullWordRegex = new RegExp(`\\b${word}\\b`, 'i');
        const fullWord = fullWordRegex.test(sentence);

        // Check for partial-word match (contains word anywhere)
        const partial = sentence.includes(word);

        if (partial && (!item.enkelHeelWoord || fullWord))
        {
            results.push({
                word: word,
                fullWord: fullWord,
                replacement: item.vervanging.toLowerCase()
            });
        }
    }

    // Deduplicate results by both word and fullWord
    const unique = [];
    for (const r of results)
    {
        if (!unique.some(u => u.word === r.word && u.fullWord === r.fullWord))
        {
            unique.push(r);
        }
    }

    return unique;
}

function formatWordList (matches)
{
    // Extract only the 'word' field
    const words = matches.map(m => m.replacement);

    // Remove duplicates (same spelling, regardless of fullWord)
    const uniqueWords = [...new Set(words)];

    if (uniqueWords.length === 0) return '';
    if (uniqueWords.length === 1) return `"${uniqueWords[0]}"`;
    if (uniqueWords.length === 2) return `"${uniqueWords[0]}" en "${uniqueWords[1]}"`;

    for (let i = 0, l = uniqueWords.length; i < l; i++)
    {
        uniqueWords[i] = `"${uniqueWords[i]}"`;
    }

    // Join with commas, and add 'en' before the last
    const lastWord = uniqueWords.pop();
    return `${uniqueWords.join(', ')} en ${lastWord}`;
}
