"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lifecycle = void 0;
const fsm_js_1 = __importDefault(require("../fsm/fsm.js"));
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
class Lifecycle {
    /**
     * Creates an instance of Lifecycle.
     * @memberof Lifecycle
     */
    constructor() {
        /**
         * Start trigger
         *
         * @private
         * @type {Symbol}
         * @memberof Lifecycle
         */
        this.startTrigger = Symbol('start');
        /**
         * Started trigger
         *
         * @private
         * @type {Symbol}
         * @memberof Lifecycle
         */
        this.startedTrigger = Symbol('started');
        /**
         * Stopping trigger
         *
         * @private
         * @type {Symbol}
         * @memberof Lifecycle
         */
        this.stoppingTrigger = Symbol('stopping');
        /**
         * Stop trigger
         *
         * @private
         * @type {Symbol}
         * @memberof Lifecycle
         */
        this.stopTrigger = Symbol('stop');
        /**
         * Starting state.
         *
         * @private
         * @type {IState}
         * @memberof Lifecycle
         */
        this.startingState = {
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
        this.runningState = {
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
        this.stoppingState = {
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
        this.stoppedState = {
            key: Symbol('stopped'),
            // permit: new Set([
            //   this.stoppingState.key,
            // ]),
        };
        this.stateMachine = new fsm_js_1.default();
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
exports.Lifecycle = Lifecycle;
exports.default = Lifecycle;
