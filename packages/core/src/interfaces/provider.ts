import InjectionScope from '../enums/injection-scope.js';
import Token from '../types/token.js';

/**
 * provider interface
 *
 * @interface IProvider
 * @template T
 */
export interface IProvider<T> {
  provide: Token<T>;
  scope?: InjectionScope;
  scopedValue?: T;
  owner?: symbol;
}

export default IProvider;
