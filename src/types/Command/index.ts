import type { ItemBase } from "../tarkov/items";

export interface CommandBase {
    commandType: string;
    command: string;

    description: string;
}

export interface CommandGive extends CommandBase {
    commandType: CommandType.give;

    giveItem: ItemBase

}

export enum CommandType {
    give,
    task
}
