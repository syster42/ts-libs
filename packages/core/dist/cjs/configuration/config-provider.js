"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigProvider = void 0;
const changeset_type_js_1 = __importDefault(require("../enums/changeset-type.js"));
const changeset_js_1 = __importDefault(require("./changeset.js"));
/**
 * config provider class
 *
 * @class ConfigProvider
 */
class ConfigProvider {
    constructor() {
        /**
         * holds the config data
         *
         * @protected
         * @type {{ [key: string]: string }}
         * @memberof ConfigProvider
         */
        this.data = {};
        /**
         * Callback when config is written
         *
         * @memberof ConfigProvider
         */
        // eslint-disable-next-line class-methods-use-this
        this.configWritten = () => void 0;
        /**
         * Callback when a config entry is changed
         *
         * @memberof ConfigProvider
         */
        // eslint-disable-next-line class-methods-use-this
        this.configEntryChanged = () => void 0;
    }
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
            changes.type = changeset_type_js_1.default.ADD;
        }
        else if (this.data[key] !== undefined && value === undefined) {
            changes.type = changeset_type_js_1.default.REMOVE;
        }
        else if (this.data[key] !== value) {
            changes.type = changeset_type_js_1.default.UPDATE;
        }
        if (this.data[key] === value) {
            changes.type = changeset_type_js_1.default.NONE;
        }
        this.data[key] = value;
        const changeSet = new changeset_js_1.default(key, value, changes.type);
        if (changes.type !== changeset_type_js_1.default.NONE) {
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
        const filtered = changes.filter((c) => c.type !== changeset_type_js_1.default.NONE);
        if (filtered.length > 0) {
            this.configWritten(filtered);
        }
    }
}
exports.ConfigProvider = ConfigProvider;
exports.default = ConfigProvider;
