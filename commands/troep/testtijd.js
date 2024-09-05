const ms = require('ms');
const dayjs = require('dayjs');

module.exports = {
	name: 'testtijd',
	description: 'test de tijd',
    args: true,
	execute(message, args) {
		let aantal = parseInt(args[0]);

        if (tijd < 0)
        {
            //600000ms = 10 minuten
            tijd = 600000 * aantal * aantal;
        }
        
        tijd *= Math.random();
        //standaard 10 minuten plus een uur willekeur
        tijd += 600000 + (Math.random() * 6000000);

        let duurEnglish = `**${ms(tijd, { long: true })}**`;
        let duur = vertaalTijdIndicatie(duurEnglish);
	},
};