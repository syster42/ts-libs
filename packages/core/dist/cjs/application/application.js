"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const config_builder_js_1 = __importDefault(require("../configuration/config-builder.js"));
const config_js_1 = __importDefault(require("../configuration/config.js"));
const configure_js_1 = __importDefault(require("../configuration/util/configure.js"));
const injection_scope_js_1 = __importDefault(require("../enums/injection-scope.js"));
const container_js_1 = __importDefault(require("../ioc/container.js"));
const root_container_js_1 = __importDefault(require("../ioc/tokens/root-container.js"));
const logger_js_1 = __importDefault(require("../logger/logger.js"));
const cluster_js_1 = __importDefault(require("./cluster.js"));
const runtime_js_1 = __importDefault(require("./runtime.js"));
/**
 * Application class
 *
 * ```typescript
 * import { Application } from '@syster42/core';
 * const app = new Application();
 * await app.run(MainServiceClass, logger);
 * ```
 * @class
 */
class Application {
    /**
     * Creates an instance of Application.
     * @memberof Application
     */
    constructor() {
        this.container = new container_js_1.default({
            name: 'root-container',
        });
        this.runtime = new runtime_js_1.default(this.container);
        this.container.addProvider({
            provide: root_container_js_1.default,
            value: this.container,
        });
        this.configSources = new Set();
    }
    /**
     * adds a config source to the config registry
     *
     * @param {Ctor<IConfigSource>} source
     * @memberof Application
     */
    addConfigSource(source) {
        this.configSources.add(source);
    }
    /**
     * sets the config provider
     *
     * @param {Ctor<T extends Config>} config
     * @memberof Application
     */
    setConfigProvider(config) {
        this.ConfigClass = config;
    }
    /**
     * runs the application
     *
     * @template T
     * @param {Ctor<T>} mainServiceClass
     * @param {Logger} [logger]
     * @return {*}  {Promise<void>}
     * @memberof Application
     */
    async run(mainServiceClass, logger) {
        /* istanbul ignore next */
        const loop = setInterval(() => void 0, 3600);
        this.initLogger(logger);
        this.container.addProvider({
            class: cluster_js_1.default,
            provide: cluster_js_1.default,
        });
        this.cluster = this.container.inject(cluster_js_1.default);
        await this.cluster.runClustered(async () => {
            await this.runInternal(mainServiceClass);
        });
        clearInterval(loop);
        return Promise.resolve();
    }
    /**
     * initializes logger and adds it to the container
     *
     * @private
     * @param {Logger} [logger]
     * @memberof Application
     */
    initLogger(logger) {
        if (logger === undefined) {
            this.container.addProvider({
                class: logger_js_1.default,
                provide: logger_js_1.default,
                scopedValue: new logger_js_1.default(),
            });
        }
        else {
            this.container.addProvider({
                class: logger_js_1.default,
                provide: logger_js_1.default,
                scopedValue: logger,
            });
        }
    }
    /**
     * runs the application
     *
     * @private
     * @template T
     * @param {Ctor<T>} mainServiceClass
     * @return {*}  {Promise<void>}
     * @memberof Application
     */
    async runInternal(mainServiceClass) {
        var _a, _b, _c, _d;
        let loopIv;
        if (!cluster_js_1.default.isPrimary || this.cluster.isStandAlone) {
            /* istanbul ignore next */
            loopIv = setInterval(() => void 0, 1000 * 60 * 60);
            if (this.configSources.size > 0) {
                this.container.addProvider({
                    provide: config_builder_js_1.default,
                    class: config_builder_js_1.default,
                    scope: injection_scope_js_1.default.SINGLETON,
                });
                this.container.inject(config_builder_js_1.default);
                const builder = this.container.getProvider(config_builder_js_1.default);
                const injectedSources = [];
                this.configSources.forEach((source) => {
                    var _a;
                    this.container.addProvider({
                        class: source,
                        provide: source,
                        scope: injection_scope_js_1.default.SINGLETON,
                    });
                    const injected = this.container.inject(source);
                    (_a = builder.scopedValue) === null || _a === void 0 ? void 0 : _a.add(injected);
                    injectedSources.push(injected);
                });
                (_a = builder.scopedValue) === null || _a === void 0 ? void 0 : _a.setConfigClass(this.ConfigClass);
                const config = (_b = builder.scopedValue) === null || _b === void 0 ? void 0 : _b.build();
                await (config === null || config === void 0 ? void 0 : config.loaded);
                injectedSources.forEach((source) => {
                    (0, configure_js_1.default)(source.configClass, config);
                });
                this.container.addProvider({
                    provide: (_c = this.ConfigClass) !== null && _c !== void 0 ? _c : config_js_1.default,
                    class: (_d = this.ConfigClass) !== null && _d !== void 0 ? _d : config_js_1.default,
                    scope: injection_scope_js_1.default.SINGLETON,
                    scopedValue: config,
                });
            }
            this.container.addProvider({
                class: mainServiceClass,
                provide: mainServiceClass,
            });
            this.container.inject(mainServiceClass);
        }
        await this.runtime.start();
        // end of application
        if (cluster_js_1.default.isPrimary) {
            await this.cluster.shutdown();
        }
        if (loopIv) {
            clearInterval(loopIv);
        }
        await this.container.delete();
        return Promise.resolve();
    }
}
exports.Application = Application;
exports.default = Application;
