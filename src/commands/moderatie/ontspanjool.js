import common from "../../common.ts";

export default {
	name: 'os',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "s");
	},
};