/* eslint-disable no-console */
import { inspect } from 'util';
import LogLevel from '../../enums/log-level.js';
import Transport from '../transport.js';
import createTemplate from '../util/create-template.js';
import format from '../util/format.js';
/**
 * map console log level to log level
 * @type {*}
 */
const consoleMap = new Map([
    [LogLevel.CRITICAL, console.error],
    [LogLevel.ERROR, console.error],
    [LogLevel.WARNING, console.warn],
    [LogLevel.INFORMATION, console.info],
    [LogLevel.DEBUG, console.debug],
    [LogLevel.TRACE, console.trace],
]);
/**
 * default config for console transport
 * @type {*}
 */
const defaultConfig = {
    level: LogLevel.INFORMATION,
    template: createTemplate(format.text('['), format.date(''), format.text(', '), format.pid(), format.text('] - '), format.level(), format.text(' - '), format.location(), format.text(': '), format.message()),
};
/**
 * console transport class
 *
 * @class Console
 * @extends {Transport<IConsoleConfig>}
 */
export class Console extends Transport {
    constructor(config) {
        super({ ...defaultConfig, ...config });
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
            return `${inspect(value, false, 2, true)}`;
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
        /* istanbul ignore next */
        (consoleMap.get(level) ?? console.log)(message);
    }
}
export default Console;
