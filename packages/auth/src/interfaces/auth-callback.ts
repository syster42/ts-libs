import { Nullable } from '@syster42/core';

export interface IAuthCallback<T> {
  (): Promise<Nullable<T>>;
}

export default IAuthCallback;
