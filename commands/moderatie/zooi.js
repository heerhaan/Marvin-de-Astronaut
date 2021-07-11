module.exports = {
	name: 'zooi',
	description: 'dit hoort niet te bestaan oet',
    args: true,
	execute(message, args, client) {
        // assuming you want the command to mention the target, for example: `!mute @user`
        const target = message.mentions.members.first();
        const role = message.guild.roles.cache.find(x => x.name === "Gaylords");

        target.roles.add(role);


        setTimeout(() => {
            target.roles.remove(role); // remove the role
          }, 30000);
	},
};