// import { Sequelize } from "./db/database";

const fs = require('fs');
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

client.login(token);