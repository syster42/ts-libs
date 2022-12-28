var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Singleton from '../decorators/singleton.js';
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
let ConfigBuilder = class ConfigBuilder {
    /**
     * list of internal config sources
     *
     * @private
     * @type {IConfigSource[]}
     * @memberof ConfigBuilder
     */
    internalSources = [];
    ConfigClass;
    setConfigClass(configClass) {
        this.ConfigClass = configClass;
        return this;
    }
    /**
     * build all config sources
     *
     * @return {*}  {Config}
     * @memberof ConfigBuilder
     */
    build() {
        const providers = [];
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
    sources() {
        return this.internalSources;
    }
    /**
     * add config source
     *
     * @param {IConfigSource} source
     * @return {*}  {ConfigBuilder}
     * @memberof ConfigBuilder
     */
    add(source) {
        this.internalSources.push(source);
        return this;
    }
};
ConfigBuilder = __decorate([
    Singleton()
], ConfigBuilder);
export { ConfigBuilder };
export default ConfigBuilder;
