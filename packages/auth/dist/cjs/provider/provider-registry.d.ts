import { Container, Ctor, Logger } from '@syster42/core';
import Provider from './provider.js';
export declare class ProviderRegistry {
    private readonly logger;
    private readonly parent;
    private static instance;
    private readonly providers;
    private readonly container;
    constructor(logger: Logger, parent: Container);
    static register(provider: Ctor<Provider>): void;
    types(): string[];
    get(type: string): Provider | undefined;
    private register;
}
export default ProviderRegistry;
//# sourceMappingURL=provider-registry.d.ts.map