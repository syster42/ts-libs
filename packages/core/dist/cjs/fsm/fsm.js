"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fsm = void 0;
const state_machine_error_js_1 = __importDefault(require("../errors/state-machine-error.js"));
/**
 * state machine class
 *
 * ```typescript
 * import { StateMachine } from '@syster42/core';
 * const stateMachine = new StateMachine();

 stateMachine
 .addState(state1)
 .addState(state2)
 .addState(state3)
 .addState(state4);

 stateMachine.setState(state1);
 stateMachine.setState(state2);
 stateMachine.trigger(trigger1);
 * ```
 * @class Fsm
 */
class Fsm {
    /**
     * Creates an instance of StateMachine.
     * @memberof StateMachine
     */
    constructor() {
        /**
         * indicates if the state machine is transitioning
         *
         * @private
         * @type {boolean}
         * @memberof StateMachine
         */
        this.isTransitioning = false;
        /**
         * queue of states to transition to
         *
         * @private
         * @type {any[]}
         * @memberof StateMachine
         */
        this.queue = [];
        this.states = new Map();
        this.triggers = new Map();
    }
    /**
     * sets the state of the state machine
     *
     * @param {Symbol} key
     * @return {*}  {Promise<void>}
     * @memberof StateMachine
     */
    async setState(key) {
        if (!this.states.has(key)) {
            throw new state_machine_error_js_1.default("State doesn't exist");
        }
        const newState = this.states.get(key);
        if (this.currentState === newState) {
            return;
        }
        if (this.currentState && newState && this.currentState !== newState && newState.permit && !newState.permit.has(this.currentState.key)) {
            throw new state_machine_error_js_1.default("Can't enter state from previous state");
        }
        if (this.isTransitioning) {
            this.queue.push(key);
            return;
        }
        this.isTransitioning = true;
        if (this.currentState && this.currentState.onExit) {
            this.isTransitioning = true;
            await this.currentState.onExit();
        }
        this.currentState = newState;
        if (this.currentState.onEnter) {
            this.isTransitioning = true;
            await this.currentState.onEnter();
        }
        this.isTransitioning = false;
    }
    /**
     * adds a state to the state machine
     *
     * @param {IState} state
     * @return {*}  {StateMachine}
     * @memberof StateMachine
     */
    addState(state) {
        var _a;
        this.states.set(state.key, state);
        (_a = state.triggers) === null || _a === void 0 ? void 0 : _a.forEach((trigger) => {
            this.triggers.set(trigger, state.key);
        });
        return this;
    }
    /**
     * updates the state machine
     *
     * @param {number} delta
     * @return {*}  {void}
     * @memberof StateMachine
     */
    update(delta) {
        if (this.queue.length > 0) {
            this.setState(this.queue.shift());
            return;
        }
        if (this.currentState && this.currentState.onUpdate) {
            this.currentState.onUpdate(delta);
        }
    }
    /**
     * triggers a state change
     *
     * @param {Symbol} trigger
     * @return {*}  {void}
     * @memberof StateMachine
     */
    trigger(trigger) {
        if (!this.triggers.has(trigger)) {
            return;
        }
        const state = this.triggers.get(trigger);
        if (state) {
            this.setState(state);
        }
    }
}
exports.Fsm = Fsm;
exports.default = Fsm;
