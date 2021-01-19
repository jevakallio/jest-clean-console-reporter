import {LogType} from "@jest/console/build/types";

export type Matcher = RegExp | string | ((message: string, type: LogType) => boolean)

export type Group = string | null | ((message: string, type: LogType, matcher: Matcher) => string | null)

export interface Rule {
    match: Matcher
    group: Group
    keep?: boolean
}

export interface Options {
    rules?: Rule[],
    levels?: LogType[]
}
