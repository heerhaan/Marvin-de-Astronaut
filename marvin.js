import {Client, Collection, GatewayIntentBits, Partials} from "discord.js";
import fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');

// Loopt door de categoriefolders heen om alle commands toe te voegen
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = `./commands/${folder}/${file}`;
    const commandModule = await import(filePath);
    const command = commandModule.default ?? commandModule;

    client.commands.set(command.name, command);
  }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const eventModule = await import(`./events/${file}`);
  const event = eventModule.default ?? eventModule;

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}


client.login(process.env.TOKEN);