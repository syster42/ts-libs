import IContainerOptions from '../interfaces/container-options.js';
import IContainer from '../interfaces/container.js';
import Provider from '../types/provider.js';
import Token from '../types/token.js';
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
export declare class Container implements IContainer {
    /**
     * map to hold all providers
     *
     * @private
     * @type {Map<Token<any>, Provider<any>>}
     * @memberof Container
     */
    private readonly providers;
    /**
     * list to hold all child container
     *
     * @private
     * @type {Container[]}
     * @memberof Container
     */
    private readonly children;
    /**
     * name of the container
     *
     * @private
     * @type {string}
     * @memberof Container
     */
    private name;
    /**
     * id of the container
     *
     * @private
     * @type {Symbol}
     * @memberof Container
     */
    private readonly id;
    /**
     * Creates an instance of Container.
     * @param {IContainerOptions} [options]
     * @memberof Container
     */
    constructor(options?: IContainerOptions);
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
    private static getName;
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
    private static injectValue;
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
    private static injectFactory;
    /**
     * checks if the provider is injectable
     *
     * @private
     * @static
     * @template T
     * @param {Provider<T>} provider
     * @memberof Container
     */
    private static checkInjectable;
    /**
     * gets all providers as map
     *
     * @return {*}  {Map<Token<any>, Provider<any>>}
     * @memberof Container
     */
    getProviderMap(): Map<Token<any>, Provider<any>>;
    /**
     * adds a provider
     *
     * @template T
     * @param {Provider<T>} provider
     * @return {*}  {Container}
     * @memberof Container
     */
    addProvider<T>(provider: Provider<T>): Container;
    /**
     * get a provider
     *
     * @template T
     * @param {Token<T>} provide
     * @param {boolean} [searchAncestors=false]
     * @return {*}  {(Provider<T>)}
     * @memberof Container
     */
    getProvider<T>(provide: Token<T>, searchAncestors?: boolean): Provider<T>;
    /**
     * gets all providers as array
     *
     * @return {*}  {Provider<any>[]}
     * @memberof Container
     */
    getProviders(): Provider<any>[];
    /**
     * injects a value to the container
     *
     * @template T
     * @param {Token<T>} type
     * @return {*}  {T}
     * @memberof Container
     */
    inject<T>(type: Token<T>): T;
    /**
     * delete
     *
     * @return {*}  {Promise<void>}
     * @memberof Container
     */
    delete(): Promise<void>;
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
    private injectUsingProvider;
    /**
     * injects a class
     *
     * @private
     * @template T
     * @param {IClassProvider<T>} provider
     * @return {*}  {T}
     * @memberof Container
     */
    private injectClass;
    /**
     * get metadata params for a class
     *
     * @private
     * @template T
     * @param {Ctor<T>} target
     * @return {*}  {T[]}
     * @memberof Container
     */
    private getParams;
}
export default Container;
//# sourceMappingURL=container.d.ts.map