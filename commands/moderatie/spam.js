const ms = require('ms');

module.exports = {
	name: 'spam',
    description: 'Voor als je zin hebt om moeilijk irritant te doen',
    usage: '[woordje] [getal][s/m]',
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
            if (time > 181000) {
                return message.channel.send('Weet je, ik ga niet meer dan 3 minuten lang hetzelfde roepen. Je kan te ver gaan, flauwerik.');
            }
            else if (!time) {
                return message.channel.send("Geen idee voor hoe lang je dat wou doen dus ik doe het gewoon niet")
            }
            else {
                var interval = setInterval (function () {
                    message.channel.send(spammedMsg);
                }, 1 * 2500);

                setTimeout(() => { clearInterval(interval) }, time);
            }
        }
	},
};