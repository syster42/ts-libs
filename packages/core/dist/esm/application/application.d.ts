import Config from '../configuration/config.js';
import IConfigSource from '../interfaces/config-source.js';
import IHostedScope from '../interfaces/hosted-scope.js';
import Container from '../ioc/container.js';
import Logger from '../logger/logger.js';
import Ctor from '../types/ctor.js';
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
export declare class Application {
    /**
     * application root container
     *
     * @private
     * @type {Container}
     * @memberof Application
     */
    container: Container;
    /**
     * handle of application runtime
     *
     * @private
     * @type {Runtime}
     * @memberof Application
     */
    private runtime;
    /**
     * handle for local clustering
     *
     * @private
     * @type {Cluster}
     * @memberof Application
     */
    private cluster;
    /**
     * list of config sources
     *
     * @private
     * @type {Set<Ctor<IConfigSource>>}
     * @memberof Application
     */
    private readonly configSources;
    private ConfigClass;
    /**
     * Creates an instance of Application.
     * @memberof Application
     */
    constructor();
    /**
     * adds a config source to the config registry
     *
     * @param {Ctor<IConfigSource>} source
     * @memberof Application
     */
    addConfigSource(source: Ctor<IConfigSource>): void;
    /**
     * sets the config provider
     *
     * @param {Ctor<T extends Config>} config
     * @memberof Application
     */
    setConfigProvider<T extends Config>(config: Ctor<T>): void;
    /**
     * runs the application
     *
     * @template T
     * @param {Ctor<T>} mainServiceClass
     * @param {Logger} [logger]
     * @return {*}  {Promise<void>}
     * @memberof Application
     */
    run<T extends IHostedScope>(mainServiceClass: Ctor<T>, logger?: Logger): Promise<void>;
    /**
     * initializes logger and adds it to the container
     *
     * @private
     * @param {Logger} [logger]
     * @memberof Application
     */
    private initLogger;
    /**
     * runs the application
     *
     * @private
     * @template T
     * @param {Ctor<T>} mainServiceClass
     * @return {*}  {Promise<void>}
     * @memberof Application
     */
    private runInternal;
}
export default Application;
//# sourceMappingURL=application.d.ts.map