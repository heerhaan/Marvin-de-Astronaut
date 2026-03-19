import common from "../../common.js";

export default {
	name: 'os',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "s");
	},
};