module.exports = {
	name: 'geefmuziek',
	description: 'Keert een rits leuke nummers terug, fijn!',
	execute(message) {
		var random = Math.floor((Math.random() * 5) + 1);
        switch (random) {
            case 1:
                message.channel.send(`Neem wat retegeile retrogolf`);
                message.channel.send(`https://open.spotify.com/playlist/4P9XPZnVWPE86wvo9bJQCs?si=g2Zwj2e0RTyJPstXSQ5uHw`);
                break;
            case 2:
                message.channel.send(`Retrogolf uit de ruimte? Klinkt als muziek in de oren als je geluid kon horen in de ruimte`);
                message.channel.send(`https://open.spotify.com/playlist/7jUtg7Cn7MKsghs8iU3ZOc?si=tPZxfVJdSO-ibfxVNMs0mw`);
                break;
            case 3:
                message.channel.send(`Als we het over ruimtemuziek willen hebben, dan is er niks meer ruimte dan dit`);
                message.channel.send(`https://open.spotify.com/playlist/37i9dQZF1DX0i61tT0OnnK?si=GXbzZoc5TTKTYQBFf8ZK6A`);
                break;
            case 4:
                message.channel.send(`Deze lijst is ideaal als je brein al zo kaduuk is dat langer dan 3 tellen nadenken moeilijk is`);
                message.channel.send(`https://open.spotify.com/playlist/34khadXVRdkxmUBXrVfiGn?si=_9grckSdR8ybo1HzDzfEeQ`);
                break;
            case 5:
                message.channel.send(`Variatie mag er ook zijn, daarom is hier een lijstje van chille lo-fi hiphop biets om op te studeren/relaxen/slapen`);
                message.channel.send(`https://open.spotify.com/playlist/5PBESEtt02HG3n3irwBIc5?si=dxlQ5WB5TJG_di9SalN3kQ`);
                break;
        }
	},
};