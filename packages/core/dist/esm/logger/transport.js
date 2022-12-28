import LogLevel from '../enums/log-level.js';
/**
 * default config for transport
 * @type {*}
 */
const defaultConfig = {
    formatter: JSON.stringify,
    level: LogLevel.INFORMATION,
    template: ({ message }) => message,
};
/**
 * abstract transport class
 *
 * @abstract
 * @class Transport
 * @template T
 */
export class Transport {
    /**
     * transport config
     *
     * @protected
     * @type {T}
     * @memberof Transport
     */
    config;
    /**
     * Creates an instance of Transport.
     * @param {T} config
     * @memberof Transport
     */
    constructor(config) {
        this.config = { ...defaultConfig, ...config };
    }
    /**
     * determines if a message should be logged in the configured log-level
     *
     * @param {LogLevel} level
     * @return {*}  {boolean}
     * @memberof Transport
     */
    canLog(level) {
        /* istanbul ignore next */
        return level <= (this.config.level ?? 0);
    }
    /**
     * formats a string
     *
     * @param {*} value
     * @return {*}  {string}
     * @memberof Transport
     */
    format(value) {
        /* istanbul ignore next */
        return this.config.formatter?.(value) || value;
    }
    /**
     * get formatted message
     *
     * @param {IInfo} info
     * @return {*}  {string}
     * @memberof Transport
     */
    message(info) {
        /* istanbul ignore next */
        return this.config.template?.(info) || info.message;
    }
}
export default Transport;
