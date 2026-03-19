import {Client, Collection, GatewayIntentBits, Partials} from "discord.js";
import fs from "node:fs";
import dotenv from "dotenv";
import {COMMAND_FOLDER_PATH, EVENT_FOLDER_PATH} from "./util/constants.type.js";
import {BaseCommand} from "./types/common";
dotenv.config();

// Extend Client type to include commands collection
declare module "discord.js" {
  export interface Client {
    commands: Collection<string, BaseCommand>;
  }
}

const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

async function loadCommands() {
  const commandFolders = fs.readdirSync(COMMAND_FOLDER_PATH);

// Loopt door de categoriefolders heen om alle commands toe te voegen
  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`${COMMAND_FOLDER_PATH}${folder}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of commandFiles) {
      const filePath = `./commands/${folder}/${file}`;
      const commandModule = await import(filePath);
      const command: BaseCommand = commandModule.default ?? commandModule;

      client.commands.set(command.name, command);
    }
  }
  console.log("Commands loaded")
}

async function loadEvents() {
  const eventFiles = fs.readdirSync(EVENT_FOLDER_PATH).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

  for (const file of eventFiles) {
    const eventModule = await import(`./events/${file}`);
    const event = eventModule.default ?? eventModule;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

await loadCommands();
await loadEvents();

await client.login(process.env.TOKEN);