// import { Sequelize } from "./db/database";

const fs = require('fs');
const Discord = require("discord.js");
const { prefix, token, ownerID } = require('./config.json');

const client = new Discord.Client({autoReconnect:true});
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.once("ready", () => {
  console.log("Marvin gaat er weer voor!");
});

client.on("message", message => {
  if (message.author.bot) return;
  let textMessage = message.content.toLowerCase();
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  var random;

  if (message.isMentioned(client.user)) {
    message.channel.send("au");
  }

  // Alles onder hier vereist dus de prefix om gelezen te worden
  if (!message.content.startsWith(prefix)) return;

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('Ho es ff, dat mag jij helemaal niet doen, mislukte poesblaffer.');
    }
  }

  if (command.args && !args.length) {
    let reply = `Hee klaplul, je moet wel goed specificeren wat je wilt, hé?!`;

    if (command.usage) {
      reply += `\nZo moet je de commando gebruiken: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('oepsiedoepsie, er ging iets stukkiewukkie!');
  }
  
  switch (commandName) {
    case "0":
      random = Math.floor((Math.random()*2)+1);
      if(random === 1){
        message.channel.send(`${message.author} is nog op planneet Aarde en verlangd nu simpelweg naar een reis in het universum.`);
      } else {
        message.channel.send(`Wat doet het toch pijn om compleet nuchter te zijn, zo voelt ${message.author} zich vast ook.`)
      }
      break;
    case "1":
      message.channel.send(`${message.author} is net van de grond maar zit nog wel in de atmosfeer van de Aarde, maar de reis is pas net begonnen en wie weet waar het heen zal gaan lopen! `);
      break;
    case "2":
      message.channel.send(`${message.author} is net uit de atmosfeer betreed nu het heelal, de reis gaat van start maar we zijn er nog lang niet!`);
      break;
    case "3":
      message.channel.send(`Langzaamaan zwevend door het heelal streeft ${message.author} nu net onze Maan voorbij. Een kleine rook voor ${message.author}, een grote rook voor de mensheid!`);
      break;
    case "4":
      message.channel.send(`Het gaat al erg lekker, ${message.author} zoeft nu flink door ons zonnestelsel. Net de ringen van Saturnus ontwijkend gaan we verder!`);
      break;
    case "5":
      message.channel.send(`Wauw! ${message.author} gaat al verder dan de mensheid bereikt heeft. Mokersnel en mokerlekker vliegend al diep de ruimte in, net voorbij de ~~planeet~~ Pluto!`);
      break;
    case "6":
      message.channel.send(`Nondeju, wat gaat dit vlug. ${message.author} dendert al door onze intergalaktische buurt heen en racet langs allerlei verschillende zonnestelsels. Die zit nu al echt dik ver in het heelal, netjes!`);
      break;
    case "7":
      message.channel.send(`Het is op dit punt dat je gaat merken dat tijd echt relatief is. ${message.author} gaat al hard genoeg dat uren minuten lijken en minuten zomaar uren kunnen worden. Een eeuw lijkt lang maar zo diep in het heelal is het maar een kleine hoeveelheid`);
      break;
    case "8":
      message.channel.send(`Het is op dit punt dat communicatie ook een moeilijke opgave wordt, ${message.author} is namelijk al zo ver weg heen. Racend door het heelal scheurt ${message.author} onze Melkweg uit. Wie had gedacht dat een mens zo hard kon gaan.`);
      break;
    case "9":
      message.channel.send(`Godnondetering, het gaat nu zo verdomd hard. Onaanspreekbaar, vaag als de neten maar wel vliegensvlug. Dat is ${message.author} in een notendop nu deze voorbij alle superclusters heen ramt. Het universum is nu van jou.`);
      break;
    case "10":
      message.channel.send(`Tering. Op dit punt reist ${message.author} niet meer door het universum maar is ${message.author} nu het universum. Alles ligt nu binnen handbereik, alles is mogelijk. We komen nu tot de diepste hoeken, de verste planeten en mooiste nebula's. Dit is een met het universum zijn op zijn piek, lekker!`);
      break;
    case "11":
      message.channel.send(`Oef. ${message.author} ging zo hard dat deze recht in een zwart gat gevlogen is. Het was leuk je gekend te hebben.`);
      break;
    case "69":
      message.channel.send('haha, 69 is het seksgetal, ik snap hem. Heel grappig, hoor.');
      break;
    case "420":
      message.channel.send(`Krijg, nou, de sodetering. Deze malle man deed het gewoon, hij vulde het wietgetal in. Het. Wiet. Getal. Wat een ongelooflijke held is ${message.author} ook`);
      break;
    case "1337":
      message.channel.send(`w0w, d17 15 3ch7 33n 3p15ch3 5p3l3rm0m3n7. kunn3n w3 h13rv00r 33n d3p kr1j63n?!`);
      break;
  }

// commands for Haan#0420 only
if(message.author.id !== ownerID) return;

if (commandName === "zeg") {
  message.delete(1);
  var string = message.content;
  string = string.replace('🚀 zeg', '');
  message.channel.send(string);
}

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

if (commandName === 'bezem') {
  const amount = parseInt(args[0]);

  if (isNaN(amount)) {
    return message.reply('Zeg uhh, volgens mij is dat geen getal, beste vriend.');
  } 
  else if (amount < 2 || amount > 100) {
    return message.reply('Lijkt me handig dat we voor nu een getal tussen de 2 en 100 doen, vindt je niet?');
  }
  else {
    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send('there was an error trying to prune messages in this channel!');
    });
  }
  }

});
client.login(token);