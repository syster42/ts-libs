import StateMachineError from '../errors/state-machine-error.js';
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
export class Fsm {
    /**
     * map to hold all states
     *
     * @private
     * @type {Map<Symbol, IState>}
     * @memberof StateMachine
     */
    states;
    /**
     * map to hold all triggers
     *
     * @private
     * @type {Map<Symbol, Symbol>}
     * @memberof StateMachine
     */
    triggers;
    /**
     * current state of the state machine
     *
     * @private
     * @type {IState}
     * @memberof StateMachine
     */
    currentState;
    /**
     * indicates if the state machine is transitioning
     *
     * @private
     * @type {boolean}
     * @memberof StateMachine
     */
    isTransitioning = false;
    /**
     * queue of states to transition to
     *
     * @private
     * @type {any[]}
     * @memberof StateMachine
     */
    queue = [];
    /**
     * Creates an instance of StateMachine.
     * @memberof StateMachine
     */
    constructor() {
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
            throw new StateMachineError("State doesn't exist");
        }
        const newState = this.states.get(key);
        if (this.currentState === newState) {
            return;
        }
        if (this.currentState && newState && this.currentState !== newState && newState.permit && !newState.permit.has(this.currentState.key)) {
            throw new StateMachineError("Can't enter state from previous state");
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
        this.states.set(state.key, state);
        state.triggers?.forEach((trigger) => {
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
export default Fsm;
