import { IAuthCallback, Provider, ProviderRegistry } from '@syster42/auth';
import { Nullable, Singleton } from '@syster42/core';

@Singleton()
export class LocalProvider extends Provider {
  public readonly type: string = 'local';

  // eslint-disable-next-line class-methods-use-this
  public async authenticate<T>(cb: IAuthCallback<T>): Promise<Nullable<T>> {
    return cb();
  }
}
ProviderRegistry.register(LocalProvider);
export default LocalProvider;
