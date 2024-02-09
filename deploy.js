const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const commandsPath = path.join(__dirname, 'commands/vervelend');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WOLLAH] commando bij ${filePath} heeft ofwel geen "data" of "execute", hoe sneu.`);
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Man is ${commands.length} commandos aan het verversen`);
        
        // Met de volgende command schakel je commands in voor alle servers, niet enkel ene guild
        // Dit zou dus normaal in een aparte deploy script staan
        //Routes.applicationCommands(clientId),
		
        const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Ayoo, gewoon ${data.length} commandos herladen.`);
	}
    catch (error) {
		console.error(error);
	}
})();
