import { Options } from "./types";
import type { Config } from '@jest/types';
import type { AggregatedResult, TestResult } from '@jest/test-result';
import { DefaultReporter } from "@jest/reporters";
import { LogEntry, LogType } from "@jest/console/build/types";
import { ReporterOnStartOptions } from "@jest/reporters/build/types";
/**
 * Overrides Jest's default reporter to filter out known console messages,
 * and prints a summary at the end of the test run.
 */
export declare class CleanConsoleReporter extends DefaultReporter {
    private readonly rules;
    private readonly levels;
    private readonly logs;
    private ignored;
    constructor(globalConfig: any, options?: Options);
    printTestFileHeader(testPath: Config.Path, config: Config.ProjectConfig, result: TestResult): void;
    filterOutKnownMessages(consoleBuffer?: LogEntry[]): LogEntry[] | undefined;
    groupMessageByKey(type: LogType, key: string): void;
    onRunStart(aggregatedResults: AggregatedResult, options: ReporterOnStartOptions): void;
    onRunComplete(): void;
}
//# sourceMappingURL=CleanConsoleReporter.d.ts.map