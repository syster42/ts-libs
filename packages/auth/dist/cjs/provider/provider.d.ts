import { Nullable } from '@syster42/core';
import IAuthCallback from '../interfaces/auth-callback.js';
import IProvider from '../interfaces/provider.js';
export declare abstract class Provider implements IProvider {
    abstract readonly type: string;
    abstract authenticate<T>(cb: IAuthCallback<T>): Promise<Nullable<T>>;
}
export default Provider;
//# sourceMappingURL=provider.d.ts.map