import LogLevel from '../enums/log-level.js';
import Transport from '../logger/transport.js';

/**
 * config interface for logger
 *
 * @interface ILoggerConfig
 */
export interface ILoggerConfig {
  level?: LogLevel;
  transports?: Transport[];
}

export default ILoggerConfig;
