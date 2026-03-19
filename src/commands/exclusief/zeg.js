const stoelpootID = 140459535293743105;

export default {
	name: 'zeg',
    args: true,
    admin: true,
	execute(message, args) {
        try {
            message.delete();
        }
        catch {
            console.log("Kon bericht niet verwijderen, wellicht mist Marvin permissies");
        }

        if (message.author.id === stoelpootID) {
            return message.channel.send("WAT? Denk je nou echt dat JIJ mag opdragen wat ik ga zeggen? HA! Ik dacht het niet, jij DWAAS.");
        }

        var string = message.content;
        string = string.replace(`${process.env.PREFIX}zeg`, "");
        message.channel.send(string);
	},
};