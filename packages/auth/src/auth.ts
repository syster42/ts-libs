import { Container, Logger, Parent, Singleton } from '@syster42/core';
import { IAuthCallback } from './interfaces/index.js';
import ProviderRegistry from './provider/provider-registry.js';

@Singleton()
export class Auth {
  private readonly registry: ProviderRegistry;

  private readonly container: Container;

  constructor(@Parent() private readonly parent: Container, private readonly logger: Logger) {
    this.container = new Container({
      name: 'auth-container',
      parent: this.parent,
    });

    this.registry = this.container
      .addProvider({
        provide: ProviderRegistry,
        class: ProviderRegistry,
      })
      .inject(ProviderRegistry);
  }

  public async authenticate<T>(type: string, cb: IAuthCallback<T>): Promise<T> {
    const provider = this.registry.get(type);
    if (!provider) {
      throw new Error(`Provider ${type} not registered`);
    }

    const result = await provider.authenticate<T>(cb);
    if (result !== null) {
      await this.serialize(result);
    }
    return result as T;
  }

  // eslint-disable-next-line class-methods-use-this
  public async serialize<T>(user: T): Promise<string> {
    this.logger.debug('serialize', user);
    return JSON.stringify(user);
  }

  // eslint-disable-next-line class-methods-use-this
  public async deserialize<T>(user: string): Promise<T> {
    this.logger.debug('deserialize', user);
    return JSON.parse(user);
  }
}

export default Auth;
