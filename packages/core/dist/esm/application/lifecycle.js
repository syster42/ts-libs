import Fsm from '../fsm/fsm.js';
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
export class Lifecycle {
    /**
     * State machine.
     *
     * @private
     * @type {Fsm}
     * @memberof Lifecycle
     */
    stateMachine;
    /**
     * Start trigger
     *
     * @private
     * @type {Symbol}
     * @memberof Lifecycle
     */
    startTrigger = Symbol('start');
    /**
     * Started trigger
     *
     * @private
     * @type {Symbol}
     * @memberof Lifecycle
     */
    startedTrigger = Symbol('started');
    /**
     * Stopping trigger
     *
     * @private
     * @type {Symbol}
     * @memberof Lifecycle
     */
    stoppingTrigger = Symbol('stopping');
    /**
     * Stop trigger
     *
     * @private
     * @type {Symbol}
     * @memberof Lifecycle
     */
    stopTrigger = Symbol('stop');
    /**
     * Starting state.
     *
     * @private
     * @type {IState}
     * @memberof Lifecycle
     */
    startingState = {
        key: Symbol('starting'),
        triggers: new Set([this.startTrigger]),
        onEnter: this.onStartInternal.bind(this),
    };
    /**
     * Running state.
     *
     * @private
     * @type {IState}
     * @memberof Lifecycle
     */
    runningState = {
        key: Symbol('running'),
        triggers: new Set([this.startedTrigger]),
        // permit: new Set([this.startingState.key]),
    };
    /**
     * Stopping state.
     *
     * @private
     * @type {IState}
     * @memberof Lifecycle
     */
    stoppingState = {
        key: Symbol('stopping'),
        triggers: new Set([this.stopTrigger]),
        onEnter: this.onStopInternal.bind(this),
    };
    /**
     * Stopped state.
     *
     * @private
     * @type {IState}
     * @memberof Lifecycle
     */
    stoppedState = {
        key: Symbol('stopped'),
        // permit: new Set([
        //   this.stoppingState.key,
        // ]),
    };
    /**
     * Creates an instance of Lifecycle.
     * @memberof Lifecycle
     */
    constructor() {
        this.stateMachine = new Fsm();
        this.stateMachine.addState(this.startingState).addState(this.runningState).addState(this.stoppingState).addState(this.stoppedState);
    }
    /**
     * callback for start
     *
     * @return {*}  {Promise<void>}
     * @memberof Lifecycle
     */
    // eslint-disable-next-line class-methods-use-this
    onStart() {
        return Promise.reject();
    }
    /**
     * callback for stop
     *
     * @return {*}  {Promise<void>}
     * @memberof Lifecycle
     */
    // eslint-disable-next-line class-methods-use-this
    onStop() {
        return Promise.reject();
    }
    /**
     * start the lifecycle
     *
     * @memberof Lifecycle
     */
    start() {
        this.stateMachine.trigger(this.startTrigger);
    }
    /**
     * set lifecycle to started
     *
     * @memberof Lifecycle
     */
    started() {
        this.stateMachine.trigger(this.startedTrigger);
    }
    /**
     * set lifecycle to stopping
     *
     * @memberof Lifecycle
     */
    stopping() {
        this.stateMachine.trigger(this.stoppingTrigger);
    }
    /**
     * stop the lifecycle
     *
     * @memberof Lifecycle
     */
    stop() {
        this.stateMachine.trigger(this.stopTrigger);
    }
    /**
     * update the lifecycle
     *
     * @memberof Lifecycle
     */
    update() {
        this.stateMachine.update(0);
    }
    /**
     * internal handler for start
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Lifecycle
     */
    async onStartInternal() {
        await this.onStart();
        await this.stateMachine.setState(this.runningState.key);
    }
    /**
     * internal handler for stop
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Lifecycle
     */
    async onStopInternal() {
        await this.onStop();
        await this.stateMachine.setState(this.stoppedState.key);
    }
}
export default Lifecycle;
