var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProviderRegistry_1;
import { Container, INJECTION_SCOPE, InjectionScope, Logger, Parent, Singleton } from '@syster42/core';
let ProviderRegistry = ProviderRegistry_1 = class ProviderRegistry {
    logger;
    parent;
    static instance;
    providers;
    container;
    constructor(logger, parent) {
        this.logger = logger;
        this.parent = parent;
        if (ProviderRegistry_1.instance) {
            throw new Error('ProviderRegistry is a singleton');
        }
        ProviderRegistry_1.instance = this;
        this.container = new Container({
            name: 'auth-provider-container',
            parent: this.parent,
        });
        this.providers = new Map();
    }
    static register(provider) {
        if (Reflect.getMetadata(INJECTION_SCOPE, provider) !== InjectionScope.SINGLETON) {
            throw new Error(`Provider ${provider.name} must be @Singleton()`);
        }
        ProviderRegistry_1.instance.register(provider);
    }
    types() {
        return Array.from(this.providers.keys());
    }
    get(type) {
        return this.providers.get(type);
    }
    register(provider) {
        if (this.container.getProviderMap().has(provider)) {
            throw new Error(`Provider ${provider.constructor.name} already registered`);
        }
        const injected = this.container
            .addProvider({
            provide: provider,
            class: provider,
        })
            .inject(provider);
        if (this.providers.has(injected.type)) {
            throw new Error(`Provider ${injected.type} already registered`);
        }
        this.providers.set(injected.type, injected);
        this.logger.debug(`Registered auth provider ${injected.type}`);
    }
};
ProviderRegistry = ProviderRegistry_1 = __decorate([
    Singleton(),
    __param(1, Parent()),
    __metadata("design:paramtypes", [Logger, Container])
], ProviderRegistry);
export { ProviderRegistry };
export default ProviderRegistry;
