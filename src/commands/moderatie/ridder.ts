import {BaseCommand} from "../../types/common.js";
import {klokRol} from "../../common.js";

export const ridderCommand : BaseCommand = {
    name: "r",
    description: "Ridderen voor de opperbaasjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        klokRol(message, args, "r");
    }
}


export const ratterCommand : BaseCommand = {
    name: "ratter",
    description: "Ridderen voor de opperbaasjes.",
    usage: '[@tek] [getal][s/m/u/d] [reden]',
    admin : true,
    execute(message, args) {
        klokRol(message, args, "r");
    }
}
