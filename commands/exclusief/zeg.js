module.exports = {
	name: 'zeg',
    args: true,
    exclusive: true,
	execute(message, args) {
		message.delete(1);
        var string = message.content;
        string = string.replace('/zeg', '');
        message.channel.send(string);
	},
};