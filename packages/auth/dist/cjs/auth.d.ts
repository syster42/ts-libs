import { Container, Logger } from '@syster42/core';
import { IAuthCallback } from './interfaces/index.js';
export declare class Auth {
    private readonly parent;
    private readonly logger;
    private readonly registry;
    private readonly container;
    constructor(parent: Container, logger: Logger);
    authenticate<T>(type: string, cb: IAuthCallback<T>): Promise<T>;
    serialize<T>(user: T): Promise<string>;
    deserialize<T>(user: string): Promise<T>;
}
export default Auth;
//# sourceMappingURL=auth.d.ts.map