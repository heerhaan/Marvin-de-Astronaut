import common from "../../common.ts";

export default {
    name: "r",
    description: "Ridderen voor de opperbaasjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        common.klokRol(message, args, "r");
    }
}
