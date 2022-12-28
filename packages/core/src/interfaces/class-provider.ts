import Ctor from '../types/ctor.js';
import IProvider from './provider.js';

/**
 * class provider interface
 *
 * @interface IClassProvider
 * @extends {IProvider<T>}
 * @template T
 */
export interface IClassProvider<T> extends IProvider<T> {
  class: Ctor<T>;
}

export default IClassProvider;
