import Container from '../ioc/container.js';
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
export declare class Runtime {
    /**
     * handle of application lifecycle
     *
     * @private
     * @type {Lifecycle}
     * @memberof Runtime
     */
    private readonly lifecycle;
    /**
     * root container
     *
     * @private
     * @type {Container}
     * @memberof Runtime
     */
    private readonly container;
    /**
     * will call when the app is stopped gracefully
     *
     * @private
     * @memberof Runtime
     */
    private stoppedResolver;
    /**
     * fulfilled when the app is stopped gracefully
     *
     * @private
     * @type {Promise<void>}
     * @memberof Runtime
     */
    private readonly stoppedPromise;
    /**
     * Creates an instance of Runtime.
     * @param {Container} container
     * @memberof Runtime
     */
    constructor(container: Container);
    /**
     * stops the runtime
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    stop(): Promise<void>;
    /**
     * starts the runtime
     *
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    start(): Promise<void>;
    /**
     * tick to update the state machine
     *
     * @private
     * @memberof Runtime
     */
    protected tick(): void;
    /**
     * retrieve hosted providers
     *
     * @private
     * @return {*}  {((IHostedScope | null)[])}
     * @memberof Runtime
     */
    private getHostedProviders;
    /**
     * calls startAsync on all hosted providers
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    private startAsync;
    /**
     * calls stopAsync on all hosted providers
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    private stopAsync;
    /**
     * callback for start
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    private onStart;
    /**
     * callback for stop
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    private onStop;
}
export default Runtime;
//# sourceMappingURL=runtime.d.ts.map