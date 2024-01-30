const ms = require('ms');

module.exports = {
	name: 'spam',
    args: true,
    admin: true,
	execute(message, args) {
		try {
            message.delete();
        }
        catch {
            console.log("Oei verrek, ik kon het bericht niet verwijderen. Mag ik dat wel?");
        }

        var spammedMsg = args[0];
        if (!args[1]) {
            return message.channel.send("Je moet wel een tijd meegeven, natnek");
        }
        else {
            var time = ms(args[1]);
            if (time > 1209600000) {
                return message.channel.send('Meer dan twee weken spammen, jezus christus man');
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