module.exports = {
	name: 'zooi',
	description: 'dit hoort niet te bestaan oet',
    args: true,
    usage: '<user> <role>',
	execute(message, args) {
		if (args[0] === 'inshallah') {
            return message.channel.send('amdullah niffo');
        }

        message.channel.send(`Je zei: ${args}\nEn das zo lang: ${args.length}`);
	},
};