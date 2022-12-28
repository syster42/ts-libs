import InjectionScope from '../enums/injection-scope.js';
import IHostedScope from '../interfaces/hosted-scope.js';
import Container from '../ioc/container.js';
import Provider from '../types/provider.js';
import Lifecycle from './lifecycle.js';

/**
 * Runtime class
 *
 * ```typescript
 * import { Runtime } from '@syster42/core';
 * const runtime = new Runtime(container);
 * await this.runtime.start();
 * ```
 * @class
 */
export class Runtime {
  /**
   * handle of application lifecycle
   *
   * @private
   * @type {Lifecycle}
   * @memberof Runtime
   */
  private readonly lifecycle: Lifecycle;

  /**
   * root container
   *
   * @private
   * @type {Container}
   * @memberof Runtime
   */
  private readonly container: Container;

  /**
   * will call when the app is stopped gracefully
   *
   * @private
   * @memberof Runtime
   */
  private stoppedResolver!: () => void;

  /**
   * fulfilled when the app is stopped gracefully
   *
   * @private
   * @type {Promise<void>}
   * @memberof Runtime
   */
  private readonly stoppedPromise: Promise<void>;

  /**
   * Creates an instance of Runtime.
   * @param {Container} container
   * @memberof Runtime
   */
  constructor(container: Container) {
    this.container = container;
    this.stoppedPromise = new Promise((res) => {
      this.stoppedResolver = res;
    });

    process.nextTick(() => this.tick());

    this.lifecycle = new Lifecycle();
    this.lifecycle.onStart = this.onStart.bind(this);
    this.lifecycle.onStop = this.onStop.bind(this);

    process.on('SIGINT', () => this.stop());
    process.on('SIGTERM', () => this.stop());
    process.on('SIGQUIT', () => this.stop());
  }

  /**
   * stops the runtime
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof Runtime
   */
  public async stop(): Promise<void> {
    this.lifecycle.stop();
    return this.stoppedPromise;
  }

  /**
   * starts the runtime
   *
   * @return {*}  {Promise<void>}
   * @memberof Runtime
   */
  public async start(): Promise<void> {
    this.lifecycle.start();
    return this.stoppedPromise;
  }

  /**
   * tick to update the state machine
   *
   * @private
   * @memberof Runtime
   */
  protected tick(): void {
    if (this) {
      process.nextTick(this.tick);
      this.lifecycle?.update();
    }
  }

  /**
   * retrieve hosted providers
   *
   * @private
   * @return {*}  {((IHostedScope | null)[])}
   * @memberof Runtime
   */
  private getHostedProviders(): (IHostedScope | null)[] {
    return this.container
      .getProviders()
      ?.filter((provider) => provider.scope === InjectionScope.HOSTED)
      .map((provider: Provider<any>) => provider.scopedValue);
  }

  /**
   * calls startAsync on all hosted providers
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof Runtime
   */
  // eslint-disable-next-line class-methods-use-this
  private async startAsync(): Promise<void> {
    const hostedProviders = this.getHostedProviders();
    const proms = hostedProviders.map((provider) => provider?.startAsync());
    await Promise.all(proms);
  }

  /**
   * calls stopAsync on all hosted providers
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof Runtime
   */
  private async stopAsync(): Promise<void> {
    const hostedProviders = this.getHostedProviders();
    const proms = hostedProviders.map((provider) => provider?.stopAsync());
    await Promise.all(proms);
    this.stoppedResolver();
  }

  /**
   * callback for start
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof Runtime
   */
  private async onStart(): Promise<void> {
    await this.startAsync();
  }

  /**
   * callback for stop
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof Runtime
   */
  private async onStop(): Promise<void> {
    await this.stopAsync();
  }
}

export default Runtime;
