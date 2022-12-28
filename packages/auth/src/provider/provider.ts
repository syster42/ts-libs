import { Nullable } from '@syster42/core';
import IAuthCallback from '../interfaces/auth-callback.js';
import IProvider from '../interfaces/provider.js';

export abstract class Provider implements IProvider {
  public abstract readonly type: string;

  public abstract authenticate<T>(cb: IAuthCallback<T>): Promise<Nullable<T>>;
}

export default Provider;
