import {REST, Routes} from "discord.js";

import fs from "node:fs";

import path from "node:path";

import dotenv from "dotenv";

import { pathToFileURL } from 'node:url';

dotenv.config();
const commands = [];

const commandsPath = path.join(__dirname, 'commands/vervelend');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const commandModule = await import(pathToFileURL(filePath).href);
	const command = commandModule.default ?? commandModule;

	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WOLLAH] commando bij ${filePath} heeft ofwel geen "data" of "execute", hoe sneu.`);
	}
}
const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Man is ${commands.length} commandos aan het verversen`);
        
        // Met de volgende command schakel je commands in voor alle servers, niet enkel ene guild
        // Dit zou dus normaal in een aparte deploy script staan
        //Routes.applicationCommands(clientId),
		
        const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Ayoo, gewoon ${data.length} commandos herladen.`);
	}
    catch (error) {
		console.error(error);
	}
})();
