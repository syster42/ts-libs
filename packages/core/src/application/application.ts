import ConfigBuilder from '../configuration/config-builder.js';
import Config from '../configuration/config.js';
import configure from '../configuration/util/configure.js';
import InjectionScope from '../enums/injection-scope.js';
import IConfigSource from '../interfaces/config-source.js';
import IHostedScope from '../interfaces/hosted-scope.js';
import Container from '../ioc/container.js';
import RootContainerToken from '../ioc/tokens/root-container.js';
import Logger from '../logger/logger.js';
import Ctor from '../types/ctor.js';
import Cluster from './cluster.js';
import Runtime from './runtime.js';

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
export class Application {
  /**
   * application root container
   *
   * @private
   * @type {Container}
   * @memberof Application
   */
  public container: Container;

  /**
   * handle of application runtime
   *
   * @private
   * @type {Runtime}
   * @memberof Application
   */
  private runtime: Runtime;

  /**
   * handle for local clustering
   *
   * @private
   * @type {Cluster}
   * @memberof Application
   */
  private cluster!: Cluster;

  /**
   * list of config sources
   *
   * @private
   * @type {Set<Ctor<IConfigSource>>}
   * @memberof Application
   */
  private readonly configSources: Set<Ctor<IConfigSource>>;

  private ConfigClass!: Ctor<Config>;

  /**
   * Creates an instance of Application.
   * @memberof Application
   */
  constructor() {
    this.container = new Container({
      name: 'root-container',
    });
    this.runtime = new Runtime(this.container);
    this.container.addProvider({
      provide: RootContainerToken,
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
  public addConfigSource(source: Ctor<IConfigSource>): void {
    this.configSources.add(source);
  }

  /**
   * sets the config provider
   *
   * @param {Ctor<T extends Config>} config
   * @memberof Application
   */
  public setConfigProvider<T extends Config>(config: Ctor<T>): void {
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
  public async run<T extends IHostedScope>(mainServiceClass: Ctor<T>, logger?: Logger): Promise<void> {
    /* istanbul ignore next */
    const loop = setInterval(() => void 0, 3600);
    this.initLogger(logger);

    this.container.addProvider({
      class: Cluster,
      provide: Cluster,
    });

    this.cluster = this.container.inject(Cluster);
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
  private initLogger(logger?: Logger): void {
    if (logger === undefined) {
      this.container.addProvider({
        class: Logger,
        provide: Logger,
        scopedValue: new Logger(),
      });
    } else {
      this.container.addProvider({
        class: Logger,
        provide: Logger,
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
  private async runInternal<T extends IHostedScope>(mainServiceClass: Ctor<T>): Promise<void> {
    let loopIv: NodeJS.Timer;
    if (!Cluster.isPrimary || this.cluster.isStandAlone) {
      /* istanbul ignore next */
      loopIv = setInterval(() => void 0, 1000 * 60 * 60);
      if (this.configSources.size > 0) {
        this.container.addProvider({
          provide: ConfigBuilder,
          class: ConfigBuilder,
          scope: InjectionScope.SINGLETON,
        });
        this.container.inject(ConfigBuilder);

        const builder = this.container.getProvider<ConfigBuilder>(ConfigBuilder);
        const injectedSources: IConfigSource[] = [];
        this.configSources.forEach((source) => {
          this.container.addProvider({
            class: source,
            provide: source,
            scope: InjectionScope.SINGLETON,
          });
          const injected = this.container.inject<IConfigSource>(source);

          builder.scopedValue?.add(injected);
          injectedSources.push(injected);
        });

        builder.scopedValue?.setConfigClass(this.ConfigClass);

        const config = builder.scopedValue?.build();

        await config?.loaded;

        injectedSources.forEach((source) => {
          configure(source.configClass, config!);
        });

        this.container.addProvider<Config>({
          provide: this.ConfigClass ?? Config,
          class: this.ConfigClass ?? Config,
          scope: InjectionScope.SINGLETON,
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
    if (Cluster.isPrimary) {
      await this.cluster.shutdown();
    }
    if (loopIv!) {
      clearInterval(loopIv);
    }
    await this.container.delete();
    return Promise.resolve();
  }
}

export default Application;
