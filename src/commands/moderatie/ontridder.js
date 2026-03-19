import {ontKlokRol} from "../../common.js";

export default {
	name: 'or',
	admin : true,
	execute(message) {
       ontKlokRol(message, "r");
	},
};