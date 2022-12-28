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
export declare class Config {
    readonly providers: ConfigProvider[];
    [key: string]: any;
    /**
     * will be called when all providers are loaded
     *
     * @private
     * @memberof Config
     */
    private promResolver;
    /**
     * Callback when config is written
     *
     * @memberof Config
     */
    /**
     * will be resolved when all providers are loaded
     *
     * @memberof Config
     */
    loaded: Promise<unknown>;
    /**
     * Callback when a config entry is changed
     *
     * @memberof Config
     */
    /**
     * Creates an instance of Config.
     * @param {ConfigProvider[]} providers
     * @memberof Config
     */
    constructor(providers: ConfigProvider[]);
    configWritten: (changes: ChangeSet[]) => void;
    configEntryChanged: (change: ChangeSet) => void;
    /**
     * gets a config value by key
     *
     * @param {string} key
     * @return {*}  {string}
     * @memberof Config
     */
    get(key: string): string;
    /**
     * gets a config value by section class
     *
     * @template T
     * @param {Ctor<T>} section
     * @return {*}  {T}
     * @memberof Config
     */
    get<T>(section: Ctor<T>): T;
    /**
     * sets a config value for key
     *
     * @param {string} key
     * @param {string} value
     * @memberof Config
     */
    set(key: string, value: string): void;
}
export default Config;
//# sourceMappingURL=config.d.ts.map