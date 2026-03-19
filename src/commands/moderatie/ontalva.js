import common from "../../common.ts";

export default {
	name: 'oa',
	admin : true,
	execute(message) {
        common.ontKlokRol(message, "a");
	},
};