import ITransportConfig from './transport-config.js';

/**
 * file logger interface
 *
 * @interface IFileConfig
 * @extends {ITransportConfig}
 */
export interface IFileConfig extends ITransportConfig {
  path: string;
}

export default IFileConfig;
