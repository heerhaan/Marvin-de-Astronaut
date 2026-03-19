import common from "../../common.js";

export default {
    name: "k",
    description: "Met kop dicht wordt nooit gemeemd.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        common.klokRol(message, args, "k");
    }
}
