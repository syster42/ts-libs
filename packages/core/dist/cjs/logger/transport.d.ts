import LogLevel from '../enums/log-level.js';
import IInfo from '../interfaces/info.js';
import ITransportConfig from '../interfaces/transport-config.js';
/**
 * abstract transport class
 *
 * @abstract
 * @class Transport
 * @template T
 */
export declare abstract class Transport<T extends ITransportConfig = ITransportConfig> {
    /**
     * transport config
     *
     * @protected
     * @type {T}
     * @memberof Transport
     */
    protected config: T;
    /**
     * Creates an instance of Transport.
     * @param {T} config
     * @memberof Transport
     */
    constructor(config: T);
    /**
     * log method
     *
     * @abstract
     * @param {{ message: string, level: LogLevel }} { message, level }
     * @memberof Transport
     */
    abstract log({ message, level }: {
        message: string;
        level: LogLevel;
    }): void;
    /**
     * determines if a message should be logged in the configured log-level
     *
     * @param {LogLevel} level
     * @return {*}  {boolean}
     * @memberof Transport
     */
    canLog(level: LogLevel): boolean;
    /**
     * formats a string
     *
     * @param {*} value
     * @return {*}  {string}
     * @memberof Transport
     */
    format(value: any): string;
    /**
     * get formatted message
     *
     * @param {IInfo} info
     * @return {*}  {string}
     * @memberof Transport
     */
    message(info: IInfo): string;
}
export default Transport;
//# sourceMappingURL=transport.d.ts.map