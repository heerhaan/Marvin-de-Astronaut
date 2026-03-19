import {ontKlokRol} from "../../common.js";

export default {
	name: 'os',
	admin : true,
	execute(message) {
       ontKlokRol(message, "s");
	},
};