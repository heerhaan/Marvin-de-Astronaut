// import { Sequelize } from "./db/database";

const fs = require('fs');
const cron = require('cron');
const Discord = require("discord.js");
const { token } = require('./config.json');

const client = new Discord.Client({autoReconnect:true});

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

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

// Loopt door de categoriefolders heen om alle commands toe te voegen
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.once('ready', () => {
  let scheduledAd = new cron.CronJob('00 30 03,09,18 * * 1-5', () => {
    const guild = client.guilds.cache.get('241646621283057665');
    const channel = guild.channels.cache.get('241646621283057665');
    channel.send(advertentie());
  });

  scheduledAd.start();
});

function advertentie() {
  var random = Math.floor((Math.random()*2)+1);
  switch (random) {
      case 1:
          return "DRINK VERFRISSENDE KOEKA COLA";
      case 2:
          return "DEZE OBER WORDT GESPONSORD DOOR REET SCHADUW LEGENDEN, DE GROOTSTE ROLLENSPEL OVER RETEN, SCHADUWEN EN LEGENDES!";
  }
}

client.login(token);