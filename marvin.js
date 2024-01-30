// import { Sequelize } from "./db/database";

const fs = require('node:fs');
const path = require('node:path');
//const cron = require('cron');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');

// Loopt door de categoriefolders heen om alle commands toe te voegen
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

/*client.once('ready', () => {
  let scheduledAd = new cron.CronJob('00 30 03,09,18 * * 1-5', () => {
    const guild = client.guilds.cache.get('241646621283057665');
    const channel = guild.channels.cache.get('241646621283057665');
    channel.send(advertentie());
  });

  scheduledAd.start();
});*/

function advertentie() {
  var random = Math.floor((Math.random() * 5) + 1);
  switch (random) {
      case 1: return "DRINK VERFRISSENDE KOEKA COLA ANDERS DRINKT HET JOU";
      case 2: return "IS UW LEVEN COMPLEET ZONDER WENSEN, DAN IS SPECIAAL VOOR U 'SOJA VOOR WITTE MENSEN'!";
      case 3: return "KOOP NU TWEE PAKKEN BRIE VOOR DE PRIJS VAN π PAKKEN. WEES ER SNEL BIJ WANT CIRKEL = TREK.";
      case 4: return "ALARM, ALARM! ER ZIJN 31 HETE, ALLEENSTAANDE MDIWN'S GEVONDEN 13KM IN DE BUURT VAN {woonplaats}. BEL SNEL NAAR 0900-MDIWN!";
      case 5: return "DOET UW JONGEHEER HET NIET MEER? DONEER HEM DAN HET GROTE TRANS(PORT)FONDS, ZIJ VERVOEREN UW LUL NAAR EEN TOEKOMSTIGE KNUL.";
  }
}

client.login(token);