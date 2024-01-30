const { Events } = require('discord.js');
//const cron = require('cron');

function advertentie() {
    var random = Math.floor((Math.random() * 5) + 1);
    switch (random) {
        case 1: return "DRINK VERFRISSENDE KOEKA COLA ANDERS DRINKT HET JOU";
        case 2: return "IS UW LEVEN COMPLEET ZONDER WENSEN, DAN IS SPECIAAL VOOR U 'SOJA VOOR WITTE MENSEN'!";
        case 3: return "KOOP NU TWEE PAKKEN BRIE VOOR DE PRIJS VAN π PAKKEN. WEES ER SNEL BIJ WANT CIRKEL = TREK.";
        case 4: return "ALARM, ALARM! ER ZIJN 31 HETE, ALLEENSTAANDE MDIWN'S GEVONDEN 13KM IN DE BUURT VAN {woonplaats}. BEL SNEL NAAR 0900-MDIWN!";
        case 5: return "DOET UW JONGEHEER HET NIET MEER? DONEER HEM DAN HET GROTE TRANS(PORT)FONDS, ZIJ VERVOEREN UW LUL NAAR EEN TOEKOMSTIGE KNUL.";
    }
}

module.exports = {
	name: "advertorial",
	once: true,
	execute(client) {
        /*client.once('ready', () => {
        let scheduledAd = new cron.CronJob('00 30 03,09,18 * * 1-5', () => {
            const guild = client.guilds.cache.get('241646621283057665');
            const channel = guild.channels.cache.get('241646621283057665');
            channel.send(advertentie());
        });

        scheduledAd.start();
        });*/
	},
};