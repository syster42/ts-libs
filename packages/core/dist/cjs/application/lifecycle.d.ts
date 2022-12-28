/**
 * Lifecycle state machine.
 *
 * ```typescript
 * import { Lifecycle } from '@syster42/core';
 * const lifecycle = new Lifecycle();
 * lifecycle.onStart = () => {
 *  console.log('start');
 * };
 * lifecycle.onStop = () => {
 *  console.log('stop');
 * };
 * lifecycle.start();
 * // ...
 * lifecycle.stop();
 * ```
 * @class Lifecycle
 */
export declare class Lifecycle {
    /**
     * State machine.
     *
     * @private
     * @type {Fsm}
     * @memberof Lifecycle
     */
    private readonly stateMachine;
    /**
     * Start trigger
     *
     * @private
     * @type {Symbol}
     * @memberof Lifecycle
     */
    private readonly startTrigger;
    /**
     * Started trigger
     *
     * @private
     * @type {Symbol}
     * @memberof Lifecycle
     */
    private readonly startedTrigger;
    /**
     * Stopping trigger
     *
     * @private
     * @type {Symbol}
     * @memberof Lifecycle
     */
    private readonly stoppingTrigger;
    /**
     * Stop trigger
     *
     * @private
     * @type {Symbol}
     * @memberof Lifecycle
     */
    private readonly stopTrigger;
    /**
     * Starting state.
     *
     * @private
     * @type {IState}
     * @memberof Lifecycle
     */
    private readonly startingState;
    /**
     * Running state.
     *
     * @private
     * @type {IState}
     * @memberof Lifecycle
     */
    private readonly runningState;
    /**
     * Stopping state.
     *
     * @private
     * @type {IState}
     * @memberof Lifecycle
     */
    private readonly stoppingState;
    /**
     * Stopped state.
     *
     * @private
     * @type {IState}
     * @memberof Lifecycle
     */
    private readonly stoppedState;
    /**
     * Creates an instance of Lifecycle.
     * @memberof Lifecycle
     */
    constructor();
    /**
     * callback for start
     *
     * @return {*}  {Promise<void>}
     * @memberof Lifecycle
     */
    onStart(): Promise<void>;
    /**
     * callback for stop
     *
     * @return {*}  {Promise<void>}
     * @memberof Lifecycle
     */
    onStop(): Promise<void>;
    /**
     * start the lifecycle
     *
     * @memberof Lifecycle
     */
    start(): void;
    /**
     * set lifecycle to started
     *
     * @memberof Lifecycle
     */
    started(): void;
    /**
     * set lifecycle to stopping
     *
     * @memberof Lifecycle
     */
    stopping(): void;
    /**
     * stop the lifecycle
     *
     * @memberof Lifecycle
     */
    stop(): void;
    /**
     * update the lifecycle
     *
     * @memberof Lifecycle
     */
    update(): void;
    /**
     * internal handler for start
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Lifecycle
     */
    private onStartInternal;
    /**
     * internal handler for stop
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Lifecycle
     */
    private onStopInternal;
}
export default Lifecycle;
//# sourceMappingURL=lifecycle.d.ts.map