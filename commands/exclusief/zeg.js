const { prefix } = require('../../config.json');

module.exports = {
	name: 'zeg',
    args: true,
    exclusive: true,
	execute(message, args) {
        try {
            message.delete();
        }
        catch {
            console.log("Kon bericht niet verwijderen, wellicht mist Marvin permissies");
        }
        var string = message.content;
        string = string.replace(`${prefix}zeg`, '');
        message.channel.send(string);
	},
};