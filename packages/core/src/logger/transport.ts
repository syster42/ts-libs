import LogLevel from '../enums/log-level.js';
import IInfo from '../interfaces/info.js';
import ITransportConfig from '../interfaces/transport-config.js';

/**
 * default config for transport
 * @type {*}
 */
const defaultConfig: Partial<ITransportConfig> = {
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
export abstract class Transport<T extends ITransportConfig = ITransportConfig> {
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
  constructor(config: T) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * log method
   *
   * @abstract
   * @param {{ message: string, level: LogLevel }} { message, level }
   * @memberof Transport
   */
  public abstract log({ message, level }: { message: string; level: LogLevel }): void;

  /**
   * determines if a message should be logged in the configured log-level
   *
   * @param {LogLevel} level
   * @return {*}  {boolean}
   * @memberof Transport
   */
  public canLog(level: LogLevel): boolean {
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
  public format(value: any): string {
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
  public message(info: IInfo): string {
    /* istanbul ignore next */
    return this.config.template?.(info) || info.message;
  }
}

export default Transport;
