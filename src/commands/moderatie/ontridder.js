import common from "../../common.js";

export default {
	name: 'or',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "r");
	},
};