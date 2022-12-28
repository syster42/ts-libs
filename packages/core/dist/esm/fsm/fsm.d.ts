import IState from '../interfaces/state.js';
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
export declare class Fsm {
    /**
     * map to hold all states
     *
     * @private
     * @type {Map<Symbol, IState>}
     * @memberof StateMachine
     */
    private states;
    /**
     * map to hold all triggers
     *
     * @private
     * @type {Map<Symbol, Symbol>}
     * @memberof StateMachine
     */
    private triggers;
    /**
     * current state of the state machine
     *
     * @private
     * @type {IState}
     * @memberof StateMachine
     */
    private currentState;
    /**
     * indicates if the state machine is transitioning
     *
     * @private
     * @type {boolean}
     * @memberof StateMachine
     */
    private isTransitioning;
    /**
     * queue of states to transition to
     *
     * @private
     * @type {any[]}
     * @memberof StateMachine
     */
    private queue;
    /**
     * Creates an instance of StateMachine.
     * @memberof StateMachine
     */
    constructor();
    /**
     * sets the state of the state machine
     *
     * @param {Symbol} key
     * @return {*}  {Promise<void>}
     * @memberof StateMachine
     */
    setState(key: symbol): Promise<void>;
    /**
     * adds a state to the state machine
     *
     * @param {IState} state
     * @return {*}  {StateMachine}
     * @memberof StateMachine
     */
    addState(state: IState): Fsm;
    /**
     * updates the state machine
     *
     * @param {number} delta
     * @return {*}  {void}
     * @memberof StateMachine
     */
    update(delta: number): void;
    /**
     * triggers a state change
     *
     * @param {Symbol} trigger
     * @return {*}  {void}
     * @memberof StateMachine
     */
    trigger(trigger: symbol): void;
}
export default Fsm;
//# sourceMappingURL=fsm.d.ts.map