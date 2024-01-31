const common = require("../../common.js");

module.exports = {
    name: "k",
    description: "Met kop dicht wordt nooit gemeemd.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        common.timedRole(message, args, "k");
    }
}
