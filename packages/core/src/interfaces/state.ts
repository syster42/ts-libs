/**
 * interface for a state
 *
 * @interface IState
 */
export interface IState {
  key: symbol;
  onEnter?: () => Promise<void> | void;
  onUpdate?: (delta?: number) => Promise<void> | void;
  onExit?: () => Promise<void> | void;
  permit?: Set<symbol>;
  triggers?: Set<symbol>;
}

export default IState;
