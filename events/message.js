module.exports = {
	name: 'message',
	execute(message, prefix, ownerID, client) {
		if (message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        // Wat Marvin zegt als je hem tekt
        /*if (message.isMentioned(client.user)) {
            message.channel.send("au");
        }*/

        // Geen prefix? Stop.
        if (!message.content.startsWith(prefix)) return;
        // Rookmelding? Netjes.
        if (!isNaN(commandName) && !args.length) {
            var rookBericht = rookMelding(commandName, message.author);
            return message.channel.send(rookBericht);
        }
        // Command niet aanwezig na de prefix? Stop.
        if (!client.commands.has(commandName)) return;

        // Haalt de command en duwt hem in een variabel
        const command = client.commands.get(commandName);

        // Controle op de permissies indien nodig
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('Ho es ff, dat mag jij helemaal niet doen, mislukte poesblaffer.');
            }
        }

        // Commando's exclusief voor Haan (lol haha)
        if (command.exclusive && message.author.id !== ownerID) {
            return message.channel.send("Hoe durf je mij zo aan te spreken, alleen mij schepper mag dat!!")
        }

        // Controleert of parameters gegeven moeten worden, indien van wel en ze zijn er niet dan geeft Marvin een melding
        if (command.args && !args.length) {
            let reply = `Hee klaplul, je moet wel goed specificeren wat je wilt, hé?!`;

            if (command.usage) {
            reply += `\nZo moet je de commando gebruiken: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        // Eindelijk voeren we de content van de command uit
        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('oepsiedoepsie, er ging iets stukkiewukkie!');
        }

        // commands for Haan#0420 only
        if(message.author.id !== ownerID) return;

        if (commandName === "zuighetlol"){
            message.delete(1);
            var interval = setInterval (function () {
            message.channel.send("j")
            .catch(console.error);
            }, 1 * 3000);
        }

        if (commandName === "stopmaar"){
        clearInterval();
        message.channel.send("lol ik stop al");
        }
	},
};

function rookMelding(niveau, author) {
    switch (niveau) {
        case "0":
        random = Math.floor((Math.random()*2)+1);
        if (random === 1){
            return `${author} is nog op planneet Aarde en verlangd nu simpelweg naar een reis in het universum.`;
        }
        else {
            return (`Wat doet het toch pijn om compleet nuchter te zijn, zo voelt ${author} zich vast ook.`)
        }
        case "1":
            return 'lol heeft haan nou 1 verwijderd, sukkel.';
        case "2":
            return (`${author} is net uit de atmosfeer betreed nu het heelal, de reis gaat van start maar we zijn er nog lang niet!`);
        case "3":
            return (`Langzaamaan zwevend door het heelal streeft ${author} nu net onze Maan voorbij. Een kleine rook voor ${author}, een grote rook voor de mensheid!`);
        case "4":
            return (`Het gaat al erg lekker, ${author} zoeft nu flink door ons zonnestelsel. Net de ringen van Saturnus ontwijkend gaan we verder!`);
        case "5":
            return (`Wauw! ${author} gaat al verder dan de mensheid bereikt heeft. Mokersnel en mokerlekker vliegend al diep de ruimte in, net voorbij de ~~planeet~~ Pluto!`);
        case "6":
            return (`Nondeju, wat gaat dit vlug. ${author} dendert al door onze intergalaktische buurt heen en racet langs allerlei verschillende zonnestelsels. Die zit nu al echt dik ver in het heelal, netjes!`);
        case "7":
            return (`Het is op dit punt dat je gaat merken dat tijd echt relatief is. ${author} gaat al hard genoeg dat uren minuten lijken en minuten zomaar uren kunnen worden. Een eeuw lijkt lang maar zo diep in het heelal is het maar een kleine hoeveelheid`);
        case "8":
            return (`Het is op dit punt dat communicatie ook een moeilijke opgave wordt, ${author} is namelijk al zo ver weg heen. Racend door het heelal scheurt ${author} onze Melkweg uit. Wie had gedacht dat een mens zo hard kon gaan.`);
        case "9":
            return (`Godnondetering, het gaat nu zo verdomd hard. Onaanspreekbaar, vaag als de neten maar wel vliegensvlug. Dat is ${author} in een notendop nu deze voorbij alle superclusters heen ramt. Het universum is nu van jou.`);
        case "10":
            return (`Tering. Op dit punt reist ${author} niet meer door het universum maar is ${author} nu het universum. Alles ligt nu binnen handbereik, alles is mogelijk. We komen nu tot de diepste hoeken, de verste planeten en mooiste nebula's. Dit is een met het universum zijn op zijn piek, lekker!`);
        case "11":
            return (`Oef. ${author} ging zo hard dat deze recht in een zwart gat gevlogen is. Het was leuk je gekend te hebben.`);
        case "69":
            return ('haha, 69 is het seksgetal, ik snap hem. Heel grappig, hoor.');
        case "420":
            return (`Krijg, nou, de sodetering. Deze malle man deed het gewoon, hij vulde het wietgetal in. Het. Wiet. Getal. Wat een ongelooflijke held is ${author} ook`);
        case "1337":
            return (`w0w, d17 15 3ch7 33n 3p15ch3 5p3l3rm0m3n7. kunn3n w3 h13rv00r 33n d3p kr1j63n?!`);
        default:
            return ("brein kapot.");
    }
}