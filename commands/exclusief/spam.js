const ms = require('ms');

module.exports = {
	name: 'spam',
    args: true,
    exclusive: true,
	execute(message, args) {
		try {
            message.delete();
        }
        catch {
            console.log("Kon bericht niet verwijderen, wellicht mist Marvin permissies");
        }

        var spammedMsg = args[0];
        if (!args[1]) {
            message.channel.send("Je moet wel tijd meegeven, saff");
        }
        else {
            var time = ms(args[1]);
            if (time > 1209600000) {
                return message.channel.send('Meer dan twee weken spammen, christus man');
            }
            else if (!time) {
                return message.channel.send("Geen idee voor hoe lang je dat wou doen, dus ik doe het niet")
            }
            else {
                var interval = setInterval (function () {
                    message.channel.send(spammedMsg);
                }, 1 * 2500);

                setTimeout(() => {clearInterval(interval)}, time);
            }
        }
	},
};