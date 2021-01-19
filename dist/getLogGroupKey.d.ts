import { Matcher, Rule } from "./types";
import { LogType } from "@jest/console/build/types";
export declare const matchWith: (matcher: Matcher, message: string, type: LogType) => boolean | RegExpMatchArray | null;
export declare const getLogGroupKey: (rules: Rule[], message: string, type: LogType) => [string | null, boolean] | [];
//# sourceMappingURL=getLogGroupKey.d.ts.map