module.exports = {
	name: 'kattijd',
    admin: true,
	execute(message) {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const katalogus = [
            "https://cdn.discordapp.com/attachments/498824337755996170/894640896161763399/breinvries.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640889706729572/boulangerie.webm",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640884140879963/boop.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640877023158322/BONSBONSBONSBONS.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640872023531550/bonk.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640867355262976/boes.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640864100483222/boep.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640858610155550/blub.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640853316931664/blijfleven.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640852377419786/bendepoes.mov",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640841774206986/avatarbeesten.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640836481003640/1617326553639.webm",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640827043823646/194547459_319757646405328_6768921071048538317_n.mp4",
            "https://cdn.discordapp.com/attachments/498824337755996170/894640813080981604/130096750_867035110773375_5527009745532096109_n.mp4",
        ];

        const videoAmount = 5;
        for (let i = 0; i < videoAmount; i++) {
            let rndInt = randomIntFromInterval(0, katalogus.length);
            message.channel.send(katalogus[rndInt]);
        }
	},
};