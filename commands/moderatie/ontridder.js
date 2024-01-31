const common = require("../../common.js");

module.exports = {
	name: 'or',
	admin : true,
	execute(message) {
        common.yoinkTimedRole(message, "r");
	},
};