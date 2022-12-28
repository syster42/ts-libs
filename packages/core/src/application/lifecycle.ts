import Fsm from '../fsm/fsm.js';
import { IState } from '../interfaces/state.js';

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
  private readonly stateMachine: Fsm;

  /**
   * Start trigger
   *
   * @private
   * @type {Symbol}
   * @memberof Lifecycle
   */
  private readonly startTrigger: symbol = Symbol('start');

  /**
   * Started trigger
   *
   * @private
   * @type {Symbol}
   * @memberof Lifecycle
   */
  private readonly startedTrigger: symbol = Symbol('started');

  /**
   * Stopping trigger
   *
   * @private
   * @type {Symbol}
   * @memberof Lifecycle
   */
  private readonly stoppingTrigger: symbol = Symbol('stopping');

  /**
   * Stop trigger
   *
   * @private
   * @type {Symbol}
   * @memberof Lifecycle
   */
  private readonly stopTrigger: symbol = Symbol('stop');

  /**
   * Starting state.
   *
   * @private
   * @type {IState}
   * @memberof Lifecycle
   */
  private readonly startingState: IState = {
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
  private readonly runningState: IState = {
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
  private readonly stoppingState: IState = {
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
  private readonly stoppedState: IState = {
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
  public onStart(): Promise<void> {
    return Promise.reject();
  }

  /**
   * callback for stop
   *
   * @return {*}  {Promise<void>}
   * @memberof Lifecycle
   */
  // eslint-disable-next-line class-methods-use-this
  public onStop(): Promise<void> {
    return Promise.reject();
  }

  /**
   * start the lifecycle
   *
   * @memberof Lifecycle
   */
  public start(): void {
    this.stateMachine.trigger(this.startTrigger);
  }

  /**
   * set lifecycle to started
   *
   * @memberof Lifecycle
   */
  public started(): void {
    this.stateMachine.trigger(this.startedTrigger);
  }

  /**
   * set lifecycle to stopping
   *
   * @memberof Lifecycle
   */
  public stopping(): void {
    this.stateMachine.trigger(this.stoppingTrigger);
  }

  /**
   * stop the lifecycle
   *
   * @memberof Lifecycle
   */
  public stop(): void {
    this.stateMachine.trigger(this.stopTrigger);
  }

  /**
   * update the lifecycle
   *
   * @memberof Lifecycle
   */
  public update(): void {
    this.stateMachine.update(0);
  }

  /**
   * internal handler for start
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof Lifecycle
   */
  private async onStartInternal(): Promise<void> {
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
  private async onStopInternal(): Promise<void> {
    await this.onStop();
    await this.stateMachine.setState(this.stoppedState.key);
  }
}

export default Lifecycle;
