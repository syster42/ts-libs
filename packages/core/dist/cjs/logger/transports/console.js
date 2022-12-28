"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
const util_1 = require("util");
const log_level_js_1 = __importDefault(require("../../enums/log-level.js"));
const transport_js_1 = __importDefault(require("../transport.js"));
const create_template_js_1 = __importDefault(require("../util/create-template.js"));
const format_js_1 = __importDefault(require("../util/format.js"));
/**
 * map console log level to log level
 * @type {*}
 */
const consoleMap = new Map([
    [log_level_js_1.default.CRITICAL, console.error],
    [log_level_js_1.default.ERROR, console.error],
    [log_level_js_1.default.WARNING, console.warn],
    [log_level_js_1.default.INFORMATION, console.info],
    [log_level_js_1.default.DEBUG, console.debug],
    [log_level_js_1.default.TRACE, console.trace],
]);
/**
 * default config for console transport
 * @type {*}
 */
const defaultConfig = {
    level: log_level_js_1.default.INFORMATION,
    template: (0, create_template_js_1.default)(format_js_1.default.text('['), format_js_1.default.date(''), format_js_1.default.text(', '), format_js_1.default.pid(), format_js_1.default.text('] - '), format_js_1.default.level(), format_js_1.default.text(' - '), format_js_1.default.location(), format_js_1.default.text(': '), format_js_1.default.message()),
};
/**
 * console transport class
 *
 * @class Console
 * @extends {Transport<IConsoleConfig>}
 */
class Console extends transport_js_1.default {
    constructor(config) {
        super(Object.assign(Object.assign({}, defaultConfig), config));
    }
    /**
     * formats a string with inspect
     *
     * @param {*} value
     * @return {*}  {string}
     * @memberof Console
     */
    // eslint-disable-next-line class-methods-use-this
    format(value) {
        /* istanbul ignore next */
        if (value !== null && typeof value === 'object') {
            return `${(0, util_1.inspect)(value, false, 2, true)}`;
        }
        return `${value}`;
    }
    /**
     * logs given message
     *
     * @param {{ message: string, level: LogLevel }} { message, level }
     * @memberof Console
     */
    // eslint-disable-next-line class-methods-use-this
    log({ message, level }) {
        var _a;
        /* istanbul ignore next */
        ((_a = consoleMap.get(level)) !== null && _a !== void 0 ? _a : console.log)(message);
    }
}
exports.Console = Console;
exports.default = Console;
