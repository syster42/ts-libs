var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import path from 'node:path';
import Injectable from '../decorators/injectable.js';
import LogLevel from '../enums/log-level.js';
import Console from './transports/console.js';
/**
 * default logger config
 * @type {*}
 */
const defaultConfig = {
    level: LogLevel.INFORMATION,
    transports: [
        new Console({
            level: LogLevel.INFORMATION,
        }),
    ],
};
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
let Logger = class Logger {
    /**
     * logger config
     *
     * @private
     * @type {ILoggerConfig}
     * @memberof Logger
     */
    config;
    /**
     * Creates an instance of Logger.
     * @param {ILoggerConfig} [config=defaultConfig]
     * @memberof Logger
     */
    constructor(config = defaultConfig) {
        this.config = { ...defaultConfig, ...config };
    }
    /**
     * logs with log-level [[LogLevel.INFORMATION]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    log(...args) {
        this.logInternal(LogLevel.INFORMATION, ...args);
    }
    /**
     * logs with log-level [[LogLevel.TRACE]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    trace(...args) {
        this.logInternal(LogLevel.TRACE, ...args);
    }
    /**
     * logs with log-level [[LogLevel.DEBUG]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    debug(...args) {
        this.logInternal(LogLevel.DEBUG, ...args);
    }
    /**
     * logs with log-level [[LogLevel.INFORMATION]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    info(...args) {
        this.logInternal(LogLevel.INFORMATION, ...args);
    }
    /**
     * logs with log-level [[LogLevel.WARNING]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    warn(...args) {
        this.logInternal(LogLevel.WARNING, ...args);
    }
    /**
     * * logs with log-level [[LogLevel.ERROR]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    error(...args) {
        this.logInternal(LogLevel.ERROR, ...args);
    }
    /**
     * logs with log-level [[LogLevel.CRITICAL]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    critical(...args) {
        this.logInternal(LogLevel.CRITICAL, ...args);
    }
    /**
     * internal logging function
     *
     * @private
     * @param {LogLevel} level
     * @param {...any[]} args
     * @memberof Logger
     */
    logInternal(level, ...args) {
        const originalFn = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        const callee = new Error().stack[2];
        Error.prepareStackTrace = originalFn;
        /* istanbul ignore next */
        const fileName = path.relative(process.cwd(), callee.getFileName() ?? '');
        const location = `${fileName}:${callee.getLineNumber()}`;
        this.config.transports?.forEach((transport) => {
            /* istanbul ignore next */
            if (!transport.canLog(level)) {
                return;
            }
            const content = args.reduce((prev, curr) => {
                const formatted = transport.format(curr);
                return `${prev} ${formatted}`;
            }, '');
            const msg = transport.message({
                level,
                message: content,
                date: new Date(),
                location,
            });
            transport.log({ message: msg, level });
        });
    }
};
Logger = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Object])
], Logger);
export { Logger };
export default Logger;
