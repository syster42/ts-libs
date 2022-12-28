import path from 'node:path';
import Injectable from '../decorators/injectable.js';
import LogLevel from '../enums/log-level.js';
import type ILoggerConfig from '../interfaces/logger-config.js';
import Console from './transports/console.js';

/**
 * default logger config
 * @type {*}
 */
const defaultConfig: ILoggerConfig = {
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
@Injectable()
export class Logger {
  /**
   * logger config
   *
   * @private
   * @type {ILoggerConfig}
   * @memberof Logger
   */
  private config: ILoggerConfig;

  /**
   * Creates an instance of Logger.
   * @param {ILoggerConfig} [config=defaultConfig]
   * @memberof Logger
   */
  constructor(config: ILoggerConfig = defaultConfig) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * logs with log-level [[LogLevel.INFORMATION]] any given argument
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  public log(...args: any[]): void {
    this.logInternal(LogLevel.INFORMATION, ...args);
  }

  /**
   * logs with log-level [[LogLevel.TRACE]] any given argument
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  public trace(...args: any[]): void {
    this.logInternal(LogLevel.TRACE, ...args);
  }

  /**
   * logs with log-level [[LogLevel.DEBUG]] any given argument
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  public debug(...args: any[]): void {
    this.logInternal(LogLevel.DEBUG, ...args);
  }

  /**
   * logs with log-level [[LogLevel.INFORMATION]] any given argument
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  public info(...args: any[]): void {
    this.logInternal(LogLevel.INFORMATION, ...args);
  }

  /**
   * logs with log-level [[LogLevel.WARNING]] any given argument
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  public warn(...args: any[]): void {
    this.logInternal(LogLevel.WARNING, ...args);
  }

  /**
   * * logs with log-level [[LogLevel.ERROR]] any given argument
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  public error(...args: any[]): void {
    this.logInternal(LogLevel.ERROR, ...args);
  }

  /**
   * logs with log-level [[LogLevel.CRITICAL]] any given argument
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  public critical(...args: any[]): void {
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
  private logInternal(level: LogLevel, ...args: any[]): void {
    const originalFn = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack): any => stack;
    const callee = (new Error().stack as unknown as NodeJS.CallSite[])[2];
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
}

export default Logger;
