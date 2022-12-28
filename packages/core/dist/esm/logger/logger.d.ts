import type ILoggerConfig from '../interfaces/logger-config.js';
/**
 * logger class
 *
 * ```typescript
 * import { Logger } from '@syster42/core';
 * const logger = new Logger();
 * logger.log('hello world');
 * logger.info('hello world');
 * logger.warn('hello world');
 * logger.error('hello world');
 * logger.critical('hello world');
 * logger.debug('hello world');
 * logger.trace('hello world');
 * ```
 * @injectable
 * @class Logger
 */
export declare class Logger {
    /**
     * logger config
     *
     * @private
     * @type {ILoggerConfig}
     * @memberof Logger
     */
    private config;
    /**
     * Creates an instance of Logger.
     * @param {ILoggerConfig} [config=defaultConfig]
     * @memberof Logger
     */
    constructor(config?: ILoggerConfig);
    /**
     * logs with log-level [[LogLevel.INFORMATION]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    log(...args: any[]): void;
    /**
     * logs with log-level [[LogLevel.TRACE]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    trace(...args: any[]): void;
    /**
     * logs with log-level [[LogLevel.DEBUG]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    debug(...args: any[]): void;
    /**
     * logs with log-level [[LogLevel.INFORMATION]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    info(...args: any[]): void;
    /**
     * logs with log-level [[LogLevel.WARNING]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    warn(...args: any[]): void;
    /**
     * * logs with log-level [[LogLevel.ERROR]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    error(...args: any[]): void;
    /**
     * logs with log-level [[LogLevel.CRITICAL]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    critical(...args: any[]): void;
    /**
     * internal logging function
     *
     * @private
     * @param {LogLevel} level
     * @param {...any[]} args
     * @memberof Logger
     */
    private logInternal;
}
export default Logger;
//# sourceMappingURL=logger.d.ts.map