const common = require("../../common.js");

module.exports = {
    name: 'vergeet',
    description: 'Pleurt de huidige spanjoleringsdata weg',
    exclusive: true,
    execute(message) {
        let legeJson = {};
        common.schrijfStrafboek(message, legeJson);
        
        let melding = 'Mijn strafboekje is weer leeggemaakt, vergeet niet de huidige spanjolen te bevrijden! (of niet)';
        message.channel.send(melding);
    },
};
