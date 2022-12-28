import LogLevel from '../enums/log-level.js';
import IInfo from './info.js';

/**
 * transport config interface
 *
 * @interface ITransportConfig
 */
export interface ITransportConfig {
  formatter?: (_: any) => string;
  level?: LogLevel;
  template?: (_: IInfo) => string;
}

export default ITransportConfig;
