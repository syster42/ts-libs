"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const node_path_1 = __importDefault(require("node:path"));
const injectable_js_1 = __importDefault(require("../decorators/injectable.js"));
const log_level_js_1 = __importDefault(require("../enums/log-level.js"));
const console_js_1 = __importDefault(require("./transports/console.js"));
/**
 * default logger config
 * @type {*}
 */
const defaultConfig = {
    level: log_level_js_1.default.INFORMATION,
    transports: [
        new console_js_1.default({
            level: log_level_js_1.default.INFORMATION,
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
     * Creates an instance of Logger.
     * @param {ILoggerConfig} [config=defaultConfig]
     * @memberof Logger
     */
    constructor(config = defaultConfig) {
        this.config = Object.assign(Object.assign({}, defaultConfig), config);
    }
    /**
     * logs with log-level [[LogLevel.INFORMATION]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    log(...args) {
        this.logInternal(log_level_js_1.default.INFORMATION, ...args);
    }
    /**
     * logs with log-level [[LogLevel.TRACE]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    trace(...args) {
        this.logInternal(log_level_js_1.default.TRACE, ...args);
    }
    /**
     * logs with log-level [[LogLevel.DEBUG]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    debug(...args) {
        this.logInternal(log_level_js_1.default.DEBUG, ...args);
    }
    /**
     * logs with log-level [[LogLevel.INFORMATION]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    info(...args) {
        this.logInternal(log_level_js_1.default.INFORMATION, ...args);
    }
    /**
     * logs with log-level [[LogLevel.WARNING]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    warn(...args) {
        this.logInternal(log_level_js_1.default.WARNING, ...args);
    }
    /**
     * * logs with log-level [[LogLevel.ERROR]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    error(...args) {
        this.logInternal(log_level_js_1.default.ERROR, ...args);
    }
    /**
     * logs with log-level [[LogLevel.CRITICAL]] any given argument
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    critical(...args) {
        this.logInternal(log_level_js_1.default.CRITICAL, ...args);
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
        var _a, _b;
        const originalFn = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        const callee = new Error().stack[2];
        Error.prepareStackTrace = originalFn;
        /* istanbul ignore next */
        const fileName = node_path_1.default.relative(process.cwd(), (_a = callee.getFileName()) !== null && _a !== void 0 ? _a : '');
        const location = `${fileName}:${callee.getLineNumber()}`;
        (_b = this.config.transports) === null || _b === void 0 ? void 0 : _b.forEach((transport) => {
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
    (0, injectable_js_1.default)(),
    __metadata("design:paramtypes", [Object])
], Logger);
exports.Logger = Logger;
exports.default = Logger;
