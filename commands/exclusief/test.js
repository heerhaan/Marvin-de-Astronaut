module.exports = {
	name: 'test',
	description: 'hiermee wordt getest!',
	execute(message, args) {
        var text = 'args: ';
        var number = 0;
        args.forEach(element => {
            ++number;
            message.channel.send(ding(element));
            text += `arg${number} ${element}, `;
        });
        message.channel.send(text);
	},
};

function ding(msg) {
    return `Het meegegeven bericht betreft: ${msg}`;
}