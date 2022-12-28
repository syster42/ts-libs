"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const injection_scope_js_1 = __importDefault(require("../enums/injection-scope.js"));
const ioc_error_js_1 = __importDefault(require("../errors/ioc-error.js"));
const helpers_js_1 = require("./helpers.js");
const injection_token_js_1 = __importDefault(require("./injection-token.js"));
const parent_container_js_1 = __importDefault(require("./tokens/parent-container.js"));
/**
 * container class
 * ```typescript
 * import { Container } from '@syster42/core';
 * const container = new Container({
 *    name: 'my-container',
 *  });
 *  const container.addProvider({
 *    provide: MyClass,
 *    value: this.container,
 *  });
 *  container.inject(MyClass);
 * ```
 * @class Container
 * @implements {IContainer}
 */
class Container {
    /**
     * Creates an instance of Container.
     * @param {IContainerOptions} [options]
     * @memberof Container
     */
    constructor(options) {
        this.name = (options === null || options === void 0 ? void 0 : options.name) || '';
        this.id = Symbol(this.name);
        if (options === null || options === void 0 ? void 0 : options.parent) {
            this.providers = new Map([...options.parent.getProviderMap()]);
            options.parent.children.push(this);
        }
        else {
            this.providers = new Map();
        }
        this.children = [];
    }
    /**
     * gets the name of the supplied token
     *
     * @private
     * @static
     * @template T
     * @param {Token<T>} token
     * @return {*}  {string}
     * @memberof Container
     */
    static getName(token) {
        /* istanbul ignore next */
        return token instanceof injection_token_js_1.default ? token.id : token.name;
    }
    /**
     * injects a value
     *
     * @private
     * @static
     * @template T
     * @param {IValueProvider<T>} provider
     * @return {*}  {T}
     * @memberof Container
     */
    static injectValue(provider) {
        return provider.value;
    }
    /**
     * injects a factory
     *
     * @private
     * @static
     * @template T
     * @param {IFactoryProvider<T>} provider
     * @return {*}  {T}
     * @memberof Container
     */
    static injectFactory(provider) {
        return provider.factory();
    }
    /**
     * checks if the provider is injectable
     *
     * @private
     * @static
     * @template T
     * @param {Provider<T>} provider
     * @memberof Container
     */
    static checkInjectable(provider) {
        if ((0, helpers_js_1.isClassProvider)(provider) && !(0, helpers_js_1.isInjectable)(provider.class)) {
            throw new ioc_error_js_1.default(`Cannot provide ${Container.getName(provider.provide)} using class ${Container.getName(provider.class)}, ${Container.getName(provider.class)} isn't injectable.`);
        }
    }
    /**
     * gets all providers as map
     *
     * @return {*}  {Map<Token<any>, Provider<any>>}
     * @memberof Container
     */
    getProviderMap() {
        return this.providers;
    }
    /**
     * adds a provider
     *
     * @template T
     * @param {Provider<T>} provider
     * @return {*}  {Container}
     * @memberof Container
     */
    addProvider(provider) {
        const prov = provider;
        if (prov.scope === undefined) {
            prov.scope = (0, helpers_js_1.getScope)(prov.provide);
        }
        prov.owner = this.id;
        Container.checkInjectable(prov);
        switch (prov.scope) {
            case injection_scope_js_1.default.HOSTED:
            case injection_scope_js_1.default.SINGLETON:
                if (prov.scopedValue === undefined && (0, helpers_js_1.isClassProvider)(prov)) {
                    const params = this.getParams(prov.class);
                    prov.scopedValue = Reflect.construct(prov.class, params);
                }
                break;
            default:
                break;
        }
        this.providers.set(prov.provide, prov);
        return this;
    }
    /**
     * get a provider
     *
     * @template T
     * @param {Token<T>} provide
     * @param {boolean} [searchAncestors=false]
     * @return {*}  {(Provider<T>)}
     * @memberof Container
     */
    getProvider(provide, searchAncestors = false) {
        if (searchAncestors) {
            return this.providers.get(provide);
        }
        const map = new Map([...this.providers].filter(([_k, v]) => v.owner === this.id));
        return map.get(provide);
    }
    /**
     * gets all providers as array
     *
     * @return {*}  {Provider<any>[]}
     * @memberof Container
     */
    getProviders() {
        return Array.from(this.providers.values());
    }
    /**
     * injects a value to the container
     *
     * @template T
     * @param {Token<T>} type
     * @return {*}  {T}
     * @memberof Container
     */
    inject(type) {
        const provider = this.providers.get(type);
        return this.injectUsingProvider(type, provider);
    }
    /**
     * delete
     *
     * @return {*}  {Promise<void>}
     * @memberof Container
     */
    // eslint-disable-next-line class-methods-use-this
    async delete() {
        return Promise.resolve();
    }
    /**
     * injects a value using the provider
     *
     * @private
     * @template T
     * @param {Token<T>} type
     * @param {Provider<T>} [provider]
     * @return {*}  {T}
     * @memberof Container
     */
    injectUsingProvider(type, provider) {
        if (provider === undefined) {
            if (type === parent_container_js_1.default) {
                const cls = {
                    class: Container,
                    provide: Container,
                    scopedValue: this,
                    owner: this.id,
                };
                return this.injectClass(cls);
            }
            throw new ioc_error_js_1.default(`No provider for type ${Container.getName(type)}`);
        }
        if ((0, helpers_js_1.isClassProvider)(provider)) {
            return this.injectClass(provider);
        }
        if ((0, helpers_js_1.isValueProvider)(provider)) {
            return Container.injectValue(provider);
        }
        if ((0, helpers_js_1.isFactoryProvider)(provider)) {
            return Container.injectFactory(provider);
        }
        /* istanbul ignore next */
        throw new ioc_error_js_1.default(`No valid provider found for type ${[Container.getName(type)]}`);
    }
    /**
     * injects a class
     *
     * @private
     * @template T
     * @param {IClassProvider<T>} provider
     * @return {*}  {T}
     * @memberof Container
     */
    injectClass(provider) {
        const prov = provider;
        const target = prov.class;
        if (prov.scopedValue) {
            return prov.scopedValue;
        }
        const params = this.getParams(target);
        const instance = Reflect.construct(target, params);
        prov.scopedValue = instance;
        return instance;
    }
    /**
     * get metadata params for a class
     *
     * @private
     * @template T
     * @param {Ctor<T>} target
     * @return {*}  {T[]}
     * @memberof Container
     */
    getParams(target) {
        const types = Reflect.getMetadata('design:paramtypes', target);
        if (types === undefined) {
            return [];
        }
        return types.map((type, idx) => {
            /* istanbul ignore next */
            if (type === undefined) {
                throw new ioc_error_js_1.default(`Error injecting, recursive dependency in constructor for type ${target.name} at pos ${idx}`);
            }
            const token = (0, helpers_js_1.getToken)(target, idx) || type;
            let provider = this.providers.get(token);
            if (provider === undefined) {
                provider = this.getProvider(token, true);
            }
            return this.injectUsingProvider(token, provider);
        });
    }
}
exports.Container = Container;
exports.default = Container;
