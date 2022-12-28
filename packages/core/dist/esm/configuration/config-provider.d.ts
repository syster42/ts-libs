import ChangeSet from './changeset.js';
/**
 * config provider class
 *
 * @class ConfigProvider
 */
export declare class ConfigProvider {
    /**
     * holds the config data
     *
     * @protected
     * @type {{ [key: string]: string }}
     * @memberof ConfigProvider
     */
    protected data: {
        [key: string]: string;
    };
    /**
     * Callback when config is written
     *
     * @memberof ConfigProvider
     */
    configWritten: (changes: ChangeSet[]) => void;
    /**
     * Callback when a config entry is changed
     *
     * @memberof ConfigProvider
     */
    configEntryChanged: (change: ChangeSet) => void;
    /**
     * load configs asynchronously
     *
     * @return {*}  {Promise<void>}
     * @memberof ConfigProvider
     */
    load(): Promise<void>;
    /**
     * gets a config value
     *
     * @param {string} key
     * @return {*}  {string}
     * @memberof ConfigProvider
     */
    tryGet(key: string): string;
    /**
     * sets a config value
     *
     * @param {string} key
     * @param {any} value
     * @return {*}  {ChangeSet}
     * @memberof ConfigProvider
     */
    set(key: string, value: any): ChangeSet;
    /**
     * finish writing configs
     *
     * @param {ChangeSet[]} changes
     * @memberof ConfigProvider
     */
    finish(changes: ChangeSet[]): void;
}
export default ConfigProvider;
//# sourceMappingURL=config-provider.d.ts.map