const common = require("../../common.js");

module.exports = {
	name: 'os',
	admin : true,
	execute(message) {
        common.yoinkTimedRole(message, "s");
	},
};