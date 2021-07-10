module.exports = {
	name: 'stuurzelfje',
	description: 'Mooi plaatje van mij.',
	execute(message, args) {
		message.channel.send("Ik zit gewoon effe lekker te bakken op de maan, ja. Kusjes en een zelfje",
        {"files": ["https://i.pinimg.com/originals/26/cf/26/26cf26b1e1e98ae0eb49bf5e58736cb2.jpg"]});
	},
};