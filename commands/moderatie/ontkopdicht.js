const common = require("../../common.js");

module.exports = {
	name: 'ok',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "k");
	},
};