import common from "../../common.ts";

export default {
	name: 'or',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "r");
	},
};