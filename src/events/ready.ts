import {Events} from "discord.js";

export default {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        console.log(`${client.user.tag} gaat er weer voor!`);
	},
};