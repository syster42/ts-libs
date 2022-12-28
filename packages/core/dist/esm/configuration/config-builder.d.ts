import IConfigSource from '../interfaces/config-source.js';
import Ctor from '../types/ctor.js';
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
export declare class ConfigBuilder {
    /**
     * list of internal config sources
     *
     * @private
     * @type {IConfigSource[]}
     * @memberof ConfigBuilder
     */
    private readonly internalSources;
    private ConfigClass;
    setConfigClass<T extends Config>(configClass: Ctor<T>): ConfigBuilder;
    /**
     * build all config sources
     *
     * @return {*}  {Config}
     * @memberof ConfigBuilder
     */
    build(): Config;
    /**
     * get all config sources
     *
     * @return {*}  {IConfigSource[]}
     * @memberof ConfigBuilder
     */
    sources(): IConfigSource[];
    /**
     * add config source
     *
     * @param {IConfigSource} source
     * @return {*}  {ConfigBuilder}
     * @memberof ConfigBuilder
     */
    add(source: IConfigSource): ConfigBuilder;
}
export default ConfigBuilder;
//# sourceMappingURL=config-builder.d.ts.map