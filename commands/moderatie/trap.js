module.exports = {
    name: "trap",
    description: 'Trap een lid uit de ober',
    args: true,
    usage: '<gebruiker>',
    admin : true,
    execute(message, args) {
        const catchErr = err => { console.error(err) }

        function kickMember(member) {
            if (!member) {
                catchErr("cant find member to kick")
            } else {
                member.kick()
                    .then((member) => {
                        message.channel.send("En weg is die afgelikte teelbal van een " + member.displayName + ", niemand zal je missen!");
                    })
                    .catch(() => {
                        message.channel.send("oepsie doepsie, het lukte mij niet :((");
                    });
            }
        }

        try {
            const members = message.mentions.members;
            members.each(kickMember);
        } catch (err) {
            catchErr(err);
        }
    }
}