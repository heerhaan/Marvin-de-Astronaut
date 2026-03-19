import{klokRol} from "../../common.js";

export default {
    name: "s",
    description: "Spanjoleren kun je leren",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        klokRol(message, args, "s");
    }
}