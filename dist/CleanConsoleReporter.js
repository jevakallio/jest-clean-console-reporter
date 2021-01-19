"use strict";
/* global require module */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanConsoleReporter = void 0;
const reporters_1 = require("@jest/reporters");
const getLogGroupKey_1 = require("./getLogGroupKey");
const getLogGroupSummary_1 = require("./getLogGroupSummary");
/**
 * Overrides Jest's default reporter to filter out known console messages,
 * and prints a summary at the end of the test run.
 */
class CleanConsoleReporter extends reporters_1.DefaultReporter {
    constructor(globalConfig, options = {}) {
        super(globalConfig);
        this.rules = options.rules || [];
        this.levels = options.levels || ["error", "warn", "info", "debug", "log"];
        this.logs = new Map();
        this.ignored = 0;
    }
    // Override DefaultReporter method
    printTestFileHeader(testPath, config, result) {
        // Strip out known console messages before passing to base implementation
        const filteredResult = Object.assign(Object.assign({}, result), { console: this.filterOutKnownMessages(result.console) });
        reporters_1.DefaultReporter.prototype.printTestFileHeader.call(this, testPath, config, filteredResult);
    }
    filterOutKnownMessages(consoleBuffer = []) {
        const rules = this.rules;
        const retain = [];
        for (const frame of consoleBuffer) {
            const { type, message } = frame;
            // Check if this a known type message
            const [key, keep] = getLogGroupKey_1.getLogGroupKey(rules, message, type);
            if (key) {
                this.groupMessageByKey(type, key);
                if (keep) {
                    retain.push(frame);
                }
            }
            else if (key === null) {
                this.ignored++;
            }
            else {
                retain.push(frame);
            }
        }
        // Based implementation expects undefined instead of empty array
        return retain.length ? retain : undefined;
    }
    groupMessageByKey(type, key) {
        // this.logs : Map<string, Map<string, number>>
        let level = this.logs.get(type);
        if (!level) {
            this.logs.set(type, (level = new Map()));
        }
        level.set(key, (level.get(key) || 0) + 1);
    }
    onRunStart(aggregatedResults, options) {
        super.onRunStart(aggregatedResults, options);
    }
    onRunComplete() {
        const summary = getLogGroupSummary_1.getLogGroupSummary(this.logs, this.levels, this.ignored);
        if (summary) {
            summary.forEach(this.log);
        }
        super.onRunComplete();
    }
}
exports.CleanConsoleReporter = CleanConsoleReporter;
//# sourceMappingURL=CleanConsoleReporter.js.map