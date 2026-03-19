import common from "../../common.ts";

export default {
	name: 'ok',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "k");
	},
};