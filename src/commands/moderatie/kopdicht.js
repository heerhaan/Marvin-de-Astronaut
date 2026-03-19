import {klokRol} from "../../common.js";

export default {
    name: "k",
    description: "Met kop dicht wordt nooit gemeemd.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        klokRol(message, args, "k");
    }
}
