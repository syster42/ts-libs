import Provider from '../types/provider.js';
import Token from '../types/token.js';

/**
 * interface for building a container
 *
 * @interface IContainer
 */
export interface IContainer {
  addProvider<T>(provider: Provider<T>): IContainer;

  getProvider<T>(provide: Token<T>): Provider<T>;

  getProviders(): Provider<any>[];

  inject<T>(type: Token<T>): T;

  delete(): Promise<void>;
}

export default IContainer;
