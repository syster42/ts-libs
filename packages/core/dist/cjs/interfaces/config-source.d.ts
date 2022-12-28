import ConfigBuilder from '../configuration/config-builder.js';
import ConfigProvider from '../configuration/config-provider.js';
import Ctor from '../types/ctor.js';
/**
 * internal for config source
 *
 * @interface IConfigSource
 */
export interface IConfigSource {
    /**
     * config class
     *
     * @type {Ctor<any>}
     * @memberof IConfigSource
     */
    configClass: Ctor<any>;
    /**
     * build config with specified config builder
     *
     * @param {ConfigBuilder} builder
     * @return {*}  {ConfigProvider}
     * @memberof IConfigSource
     */
    build(builder: ConfigBuilder): ConfigProvider;
}
export default IConfigSource;
//# sourceMappingURL=config-source.d.ts.map