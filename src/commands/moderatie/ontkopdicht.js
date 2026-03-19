import {ontKlokRol} from "../../common.js";

export default {
	name: 'ok',
	admin : true,
	execute(message) {
       ontKlokRol(message, "k");
	},
};