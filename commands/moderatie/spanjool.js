const common = require("../../common.js");

module.exports = {
    name: "s",
    description: "Spanjoleren kun je leren",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        common.klokRol(message, args, "s");
    }
}