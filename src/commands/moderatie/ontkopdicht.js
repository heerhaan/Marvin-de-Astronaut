import common from "../../common.js";

export default {
	name: 'ok',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "k");
	},
};