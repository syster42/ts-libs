import InjectionScope from '../enums/injection-scope.js';
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
    lifecycle;
    /**
     * root container
     *
     * @private
     * @type {Container}
     * @memberof Runtime
     */
    container;
    /**
     * will call when the app is stopped gracefully
     *
     * @private
     * @memberof Runtime
     */
    stoppedResolver;
    /**
     * fulfilled when the app is stopped gracefully
     *
     * @private
     * @type {Promise<void>}
     * @memberof Runtime
     */
    stoppedPromise;
    /**
     * Creates an instance of Runtime.
     * @param {Container} container
     * @memberof Runtime
     */
    constructor(container) {
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
    async stop() {
        this.lifecycle.stop();
        return this.stoppedPromise;
    }
    /**
     * starts the runtime
     *
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    async start() {
        this.lifecycle.start();
        return this.stoppedPromise;
    }
    /**
     * tick to update the state machine
     *
     * @private
     * @memberof Runtime
     */
    tick() {
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
    getHostedProviders() {
        return this.container
            .getProviders()
            ?.filter((provider) => provider.scope === InjectionScope.HOSTED)
            .map((provider) => provider.scopedValue);
    }
    /**
     * calls startAsync on all hosted providers
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    // eslint-disable-next-line class-methods-use-this
    async startAsync() {
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
    async stopAsync() {
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
    async onStart() {
        await this.startAsync();
    }
    /**
     * callback for stop
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    async onStop() {
        await this.stopAsync();
    }
}
export default Runtime;
