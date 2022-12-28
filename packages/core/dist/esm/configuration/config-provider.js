import ChangeSetType from '../enums/changeset-type.js';
import ChangeSet from './changeset.js';
/**
 * config provider class
 *
 * @class ConfigProvider
 */
export class ConfigProvider {
    /**
     * holds the config data
     *
     * @protected
     * @type {{ [key: string]: string }}
     * @memberof ConfigProvider
     */
    data = {};
    /**
     * Callback when config is written
     *
     * @memberof ConfigProvider
     */
    // eslint-disable-next-line class-methods-use-this
    configWritten = () => void 0;
    /**
     * Callback when a config entry is changed
     *
     * @memberof ConfigProvider
     */
    // eslint-disable-next-line class-methods-use-this
    configEntryChanged = () => void 0;
    /**
     * load configs asynchronously
     *
     * @return {*}  {Promise<void>}
     * @memberof ConfigProvider
     */
    // eslint-disable-next-line class-methods-use-this
    async load() {
        return Promise.resolve();
    }
    /**
     * gets a config value
     *
     * @param {string} key
     * @return {*}  {string}
     * @memberof ConfigProvider
     */
    tryGet(key) {
        return this.data[key];
    }
    /**
     * sets a config value
     *
     * @param {string} key
     * @param {any} value
     * @return {*}  {ChangeSet}
     * @memberof ConfigProvider
     */
    set(key, value) {
        const changes = {
            path: key,
            value,
            type: undefined,
        };
        if (!this.data[key]) {
            changes.type = ChangeSetType.ADD;
        }
        else if (this.data[key] !== undefined && value === undefined) {
            changes.type = ChangeSetType.REMOVE;
        }
        else if (this.data[key] !== value) {
            changes.type = ChangeSetType.UPDATE;
        }
        if (this.data[key] === value) {
            changes.type = ChangeSetType.NONE;
        }
        this.data[key] = value;
        const changeSet = new ChangeSet(key, value, changes.type);
        if (changes.type !== ChangeSetType.NONE) {
            this.configEntryChanged(changeSet);
        }
        return changeSet;
    }
    /**
     * finish writing configs
     *
     * @param {ChangeSet[]} changes
     * @memberof ConfigProvider
     */
    finish(changes) {
        const filtered = changes.filter((c) => c.type !== ChangeSetType.NONE);
        if (filtered.length > 0) {
            this.configWritten(filtered);
        }
    }
}
export default ConfigProvider;
