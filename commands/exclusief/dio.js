import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export default {
	name: 'dio',
	args: true,
	exclusive: true,
	async execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`bestaat nie: \`${commandName}\`, ${message.author}!`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

		if (!folderName) {
			return message.channel.send(`ERR: \`${command.name}\` niet gevonden in command folders.`);
		}

		try {
			const filePath = path.resolve(`./commands/${folderName}/${command.name}.js`);
			const moduleUrl = pathToFileURL(filePath).href + `?update=${Date.now()}`;
			const newCommandModule = await import(moduleUrl);
			const newCommand = newCommandModule.default ?? newCommandModule;

			await message.client.commands.set(newCommand.name, newCommand);
			await message.channel.send(`Ik verwerp mijn menselijkheid, HERLAAD DE WERELD!`);

			console.log(`Commando ${commandName} herladen, lekker bezig!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`ERR: \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};
