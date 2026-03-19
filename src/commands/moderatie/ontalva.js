import  {ontKlokRol} from "../../common.js";

export default {
	name: 'oa',
	admin : true,
	execute(message) {
       ontKlokRol(message, "a");
	},
};