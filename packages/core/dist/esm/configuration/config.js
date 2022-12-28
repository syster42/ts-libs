var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Singleton from '../decorators/singleton.js';
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
let Config = class Config {
    providers;
    /**
     * will be called when all providers are loaded
     *
     * @private
     * @memberof Config
     */
    promResolver;
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
    loaded = new Promise((res) => {
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
    constructor(providers) {
        this.providers = providers;
        Promise.all(this.providers.map((p) => p.load())).finally(() => this.promResolver());
    }
    // eslint-disable-next-line class-methods-use-this
    configWritten = () => void 0;
    // eslint-disable-next-line class-methods-use-this
    configEntryChanged = () => void 0;
    get(arg) {
        if (typeof arg === 'string') {
            for (let i = 0; i < this.providers.length; ++i) {
                const provider = this.providers[i];
                const value = provider.tryGet(arg);
                if (value !== undefined) {
                    return value;
                }
            }
        }
        else {
            return this[arg.name];
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
    set(key, value) {
        this.providers.forEach((provider) => {
            provider.set(key, value);
        });
    }
};
Config = __decorate([
    Singleton(),
    __metadata("design:paramtypes", [Array])
], Config);
export { Config };
export default Config;
