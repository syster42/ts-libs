import Factory from '../types/factory.js';
import IProvider from './provider.js';

/**
 * factory provider interface
 *
 * @interface IFactoryProvider
 * @extends {IProvider<T>}
 * @template T
 */
export interface IFactoryProvider<T> extends IProvider<T> {
  factory: Factory<T>;
}

export default IFactoryProvider;
