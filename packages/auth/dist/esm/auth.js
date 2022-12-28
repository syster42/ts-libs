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
import { Container, Logger, Parent, Singleton } from '@syster42/core';
import ProviderRegistry from './provider/provider-registry.js';
let Auth = class Auth {
    parent;
    logger;
    registry;
    container;
    constructor(parent, logger) {
        this.parent = parent;
        this.logger = logger;
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
    async authenticate(type, cb) {
        const provider = this.registry.get(type);
        if (!provider) {
            throw new Error(`Provider ${type} not registered`);
        }
        const result = await provider.authenticate(cb);
        if (result !== null) {
            await this.serialize(result);
        }
        return result;
    }
    // eslint-disable-next-line class-methods-use-this
    async serialize(user) {
        this.logger.debug('serialize', user);
        return JSON.stringify(user);
    }
    // eslint-disable-next-line class-methods-use-this
    async deserialize(user) {
        this.logger.debug('deserialize', user);
        return JSON.parse(user);
    }
};
Auth = __decorate([
    Singleton(),
    __param(0, Parent()),
    __metadata("design:paramtypes", [Container, Logger])
], Auth);
export { Auth };
export default Auth;
