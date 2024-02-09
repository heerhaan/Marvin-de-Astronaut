const common = require("../../common.js");

module.exports = {
	name: 'or',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "r");
	},
};