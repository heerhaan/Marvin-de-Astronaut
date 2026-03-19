import common from "../../common.js";

export default {
	name: 'oa',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "a");
	},
};