import {klokRol} from "../../common.js";

export default {
    name: "a",
    description: "Alvist voor de echte kutjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin: true,
    execute(message, args) {
        klokRol(message, args, "a");
    }
}
