import {Message} from "discord.js";

export type BaseCommand = {
    name: string;
    description?: string;
    usage?: string;
    aliases?: string[];
    args?: boolean;
    admin?: boolean;
    exclusive?: boolean;
    execute(message: Message, args?: string[]): void | Promise<void>;
}