const common = require("../../common.js");

module.exports = {
    name: "a",
    description: "Alvist voor de echte kutjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin: true,
    execute(message, args) {
        common.timedRole(message, args, "a");
    }
}
