import Singleton from '../decorators/singleton.js';
import Ctor from '../types/ctor.js';
import ChangeSet from './changeset.js';
import ConfigProvider from './config-provider.js';

/**
 * config class
 *
 * ```typescript
 * import { Config } from '@syster42/core';
 * const config = new Config(providerList);
 * console.log(config.get('key'));
 * ```
 * @class Config
 * @Singleton
 */
@Singleton()
export class Config {
  [key: string]: any;

  /**
   * will be called when all providers are loaded
   *
   * @private
   * @memberof Config
   */
  private promResolver!: (value?: unknown) => void;

  /**
   * Callback when config is written
   *
   * @memberof Config
   */
  /* istanbul ignore next */
  /**
   * will be resolved when all providers are loaded
   *
   * @memberof Config
   */
  public loaded = new Promise((res) => {
    this.promResolver = res;
  });

  /**
   * Callback when a config entry is changed
   *
   * @memberof Config
   */
  /* istanbul ignore next */

  /**
   * Creates an instance of Config.
   * @param {ConfigProvider[]} providers
   * @memberof Config
   */
  constructor(public readonly providers: ConfigProvider[]) {
    Promise.all(this.providers.map((p) => p.load())).finally(() => this.promResolver());
  }

  // eslint-disable-next-line class-methods-use-this
  public configWritten: (changes: ChangeSet[]) => void = () => void 0;

  // eslint-disable-next-line class-methods-use-this
  public configEntryChanged: (change: ChangeSet) => void = () => void 0;

  /**
   * gets a config value by key
   *
   * @param {string} key
   * @return {*}  {string}
   * @memberof Config
   */
  public get(key: string): string;
  /**
   * gets a config value by section class
   *
   * @template T
   * @param {Ctor<T>} section
   * @return {*}  {T}
   * @memberof Config
   */
  public get<T>(section: Ctor<T>): T;
  public get<T = null>(arg: any): any {
    if (typeof arg === 'string') {
      for (let i = 0; i < this.providers.length; ++i) {
        const provider = this.providers[i];
        const value = provider.tryGet(arg);
        if (value !== undefined) {
          return value;
        }
      }
    } else {
      return this[(arg as Ctor<T>).name];
    }
    return undefined;
  }

  /**
   * sets a config value for key
   *
   * @param {string} key
   * @param {string} value
   * @memberof Config
   */
  public set(key: string, value: string): void {
    this.providers.forEach((provider) => {
      provider.set(key, value);
    });
  }
}

export default Config;
