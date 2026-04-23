module.exports = {
	name: 'drink',
	description: 'Voor het flexen met je alcoholisme',
	execute(message) {
        message.channel.send(`Het ziet er naar uit dat ${message.author} een heerlijke drankje gevonden heeft, het beste medicijn om je problemen mee weg te drinken!`)
	},
};