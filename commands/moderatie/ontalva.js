const common = require("../../common.js");

module.exports = {
	name: 'oa',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "a");
	},
};