/* global require module */

import { Options, Rule} from "./types";
import type {Config} from '@jest/types';
import type {AggregatedResult, TestResult} from '@jest/test-result';

import {DefaultReporter} from "@jest/reporters";
import {LogEntry, LogType} from "@jest/console/build/types";
import {ReporterOnStartOptions} from "@jest/reporters/build/types";
import {getLogGroupKey} from "./getLogGroupKey";
import {getLogGroupSummary} from "./getLogGroupSummary";

/**
 * Overrides Jest's default reporter to filter out known console messages,
 * and prints a summary at the end of the test run.
 */
export class CleanConsoleReporter extends DefaultReporter {

    private readonly rules: Rule[];
    private readonly levels: LogType[];
    private readonly logs: Map<LogType, Map<string, number>>;
    private ignored: number;

    constructor(globalConfig: any, options: Options = {}) {
        super(globalConfig);
        this.rules = options.rules || [];
        this.levels = options.levels || ["error", "warn", "info", "debug", "log"];
        this.logs = new Map<LogType, Map<string, number>>();
        this.ignored = 0;
    }

    // Override DefaultReporter method
    printTestFileHeader(testPath: Config.Path, config: Config.ProjectConfig,
                        result: TestResult) {
        // Strip out known console messages before passing to base implementation
        const filteredResult = {
            ...result,
            console: this.filterOutKnownMessages(result.console),
        };

        DefaultReporter.prototype.printTestFileHeader.call(this, testPath, config,
            filteredResult);
    }

    filterOutKnownMessages(consoleBuffer: LogEntry[] = []) {
        const rules = this.rules;
        const retain: LogEntry[] = [];

        for (const frame of consoleBuffer) {
            const {type, message} = frame;

            // Check if this a known type message
            const [key, keep] = getLogGroupKey(rules, message, type);
            if (key) {
                this.groupMessageByKey(type, key);
                if (keep) {
                    retain.push(frame);
                }
            } else if (key === null) {
                this.ignored++;
            } else {
                retain.push(frame);
            }
        }

        // Based implementation expects undefined instead of empty array
        return retain.length ? retain : undefined;
    }

    groupMessageByKey(type: LogType, key: string): void {
        // this.logs : Map<string, Map<string, number>>
        let level = this.logs.get(type);
        if (!level) {
            this.logs.set(type, (level = new Map<string, number>()));
        }

        level.set(key, (level.get(key) || 0) + 1);
    }

    onRunStart(aggregatedResults: AggregatedResult,
               options: ReporterOnStartOptions): void {
        super.onRunStart(aggregatedResults, options);
    }

    onRunComplete() {
        const summary = getLogGroupSummary(this.logs, this.levels, this.ignored);
        if (summary) {
            summary.forEach(this.log);
        }

        super.onRunComplete();
    }
}
