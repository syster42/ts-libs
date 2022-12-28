import Singleton from '../decorators/singleton.js';
import IConfigSource from '../interfaces/config-source.js';
import Ctor from '../types/ctor.js';
import ConfigProvider from './config-provider.js';
import Config from './config.js';

/**
 * config builder class
 *
 *  * ```typescript
 * import { ConfigBuilder } from '@syster42/core';
 * const builder = new ConfigBuilder();
 * builder.add(source);
 * builder.build();
 * ```
 *
 * @class ConfigBuilder
 * @Singleton
 */
@Singleton()
export class ConfigBuilder {
  /**
   * list of internal config sources
   *
   * @private
   * @type {IConfigSource[]}
   * @memberof ConfigBuilder
   */
  private readonly internalSources: IConfigSource[] = [];

  private ConfigClass!: Ctor<Config>;

  public setConfigClass<T extends Config>(configClass: Ctor<T>): ConfigBuilder {
    this.ConfigClass = configClass;
    return this;
  }

  /**
   * build all config sources
   *
   * @return {*}  {Config}
   * @memberof ConfigBuilder
   */
  public build(): Config {
    const providers: ConfigProvider[] = [];
    this.internalSources.forEach((source) => {
      providers.push(source.build(this));
    });
    if (this.ConfigClass) {
      return new this.ConfigClass(providers);
    }
    return new Config(providers);
  }

  /**
   * get all config sources
   *
   * @return {*}  {IConfigSource[]}
   * @memberof ConfigBuilder
   */
  public sources(): IConfigSource[] {
    return this.internalSources;
  }

  /**
   * add config source
   *
   * @param {IConfigSource} source
   * @return {*}  {ConfigBuilder}
   * @memberof ConfigBuilder
   */
  public add(source: IConfigSource): ConfigBuilder {
    this.internalSources.push(source);
    return this;
  }
}

export default ConfigBuilder;
