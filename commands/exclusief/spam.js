module.exports = {
	name: 'spam',
    args: true,
    exclusive: true,
	execute(message, args) {
        var spammedMsg = args[0];
		message.delete(1);
        
        var interval = setInterval (function () {
            message.channel.send(spammedMsg)
            .catch(console.error);
        }, 1 * 3000);
	},
};