import { IAuthCallback, Provider } from '@syster42/auth';
import { Nullable } from '@syster42/core';
export declare class LocalProvider extends Provider {
    readonly type: string;
    authenticate<T>(cb: IAuthCallback<T>): Promise<Nullable<T>>;
}
export default LocalProvider;
//# sourceMappingURL=local-provider.d.ts.map