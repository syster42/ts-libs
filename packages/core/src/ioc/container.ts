import InjectionScope from '../enums/injection-scope.js';
import IocError from '../errors/ioc-error.js';
import IClassProvider from '../interfaces/class-provider.js';
import IContainerOptions from '../interfaces/container-options.js';
import IContainer from '../interfaces/container.js';
import IFactoryProvider from '../interfaces/factory-provider.js';
import IValueProvider from '../interfaces/value-provider.js';
import Ctor from '../types/ctor.js';
import Provider from '../types/provider.js';
import Token from '../types/token.js';
import { getScope, getToken, isClassProvider, isFactoryProvider, isInjectable, isValueProvider } from './helpers.js';
import InjectionToken from './injection-token.js';
import ParentContainerToken from './tokens/parent-container.js';

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
export class Container implements IContainer {
  /**
   * map to hold all providers
   *
   * @private
   * @type {Map<Token<any>, Provider<any>>}
   * @memberof Container
   */
  private readonly providers: Map<Token<any>, Provider<any>>;

  /**
   * list to hold all child container
   *
   * @private
   * @type {Container[]}
   * @memberof Container
   */
  private readonly children: Container[];

  /**
   * name of the container
   *
   * @private
   * @type {string}
   * @memberof Container
   */
  private name: string;

  /**
   * id of the container
   *
   * @private
   * @type {Symbol}
   * @memberof Container
   */
  private readonly id: symbol;

  /**
   * Creates an instance of Container.
   * @param {IContainerOptions} [options]
   * @memberof Container
   */
  constructor(options?: IContainerOptions) {
    this.name = options?.name || '';
    this.id = Symbol(this.name);
    if (options?.parent) {
      this.providers = new Map([...options.parent.getProviderMap()]);
      options.parent.children.push(this);
    } else {
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
  private static getName<T>(token: Token<T>): string {
    /* istanbul ignore next */
    return token instanceof InjectionToken ? token.id : token.name;
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
  private static injectValue<T>(provider: IValueProvider<T>): T {
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
  private static injectFactory<T>(provider: IFactoryProvider<T>): T {
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
  private static checkInjectable<T>(provider: Provider<T>): void {
    if (isClassProvider(provider) && !isInjectable(provider.class)) {
      throw new IocError(
        `Cannot provide ${Container.getName(provider.provide)} using class ${Container.getName(provider.class)}, ${Container.getName(
          provider.class,
        )} isn't injectable.`,
      );
    }
  }

  /**
   * gets all providers as map
   *
   * @return {*}  {Map<Token<any>, Provider<any>>}
   * @memberof Container
   */
  public getProviderMap(): Map<Token<any>, Provider<any>> {
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
  public addProvider<T>(provider: Provider<T>): Container {
    const prov = provider;
    if (prov.scope === undefined) {
      prov.scope = getScope(prov.provide);
    }

    prov.owner = this.id;

    Container.checkInjectable<T>(prov);
    switch (prov.scope) {
      case InjectionScope.HOSTED:
      case InjectionScope.SINGLETON:
        if (prov.scopedValue === undefined && isClassProvider(prov)) {
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
  public getProvider<T>(provide: Token<T>, searchAncestors = false): Provider<T> {
    if (searchAncestors) {
      return this.providers.get(provide)!;
    }

    const map = new Map([...this.providers].filter(([_k, v]) => v.owner === this.id));
    return map.get(provide)!;
  }

  /**
   * gets all providers as array
   *
   * @return {*}  {Provider<any>[]}
   * @memberof Container
   */
  public getProviders(): Provider<any>[] {
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
  public inject<T>(type: Token<T>): T {
    const provider: Provider<any> = this.providers.get(type)!;
    return this.injectUsingProvider<T>(type, provider!);
  }

  /**
   * delete
   *
   * @return {*}  {Promise<void>}
   * @memberof Container
   */
  // eslint-disable-next-line class-methods-use-this
  public async delete(): Promise<void> {
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
  private injectUsingProvider<T>(type: Token<T>, provider?: Provider<T>): T {
    if (provider === undefined) {
      if (type === ParentContainerToken) {
        const cls: IClassProvider<any> = {
          class: Container,
          provide: Container,
          scopedValue: this,
          owner: this.id,
        };
        return this.injectClass(cls) as T;
      }
      throw new IocError(`No provider for type ${Container.getName(type)}`);
    }
    if (isClassProvider(provider)) {
      return this.injectClass(provider);
    }
    if (isValueProvider(provider)) {
      return Container.injectValue(provider);
    }
    if (isFactoryProvider(provider)) {
      return Container.injectFactory(provider);
    }
    /* istanbul ignore next */
    throw new IocError(`No valid provider found for type ${[Container.getName(type)]}`);
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
  private injectClass<T>(provider: IClassProvider<T>): T {
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
  private getParams<T>(target: Ctor<T>): T[] {
    const types = Reflect.getMetadata('design:paramtypes', target);
    if (types === undefined) {
      return [];
    }
    return types.map((type: any, idx: number) => {
      /* istanbul ignore next */
      if (type === undefined) {
        throw new IocError(`Error injecting, recursive dependency in constructor for type ${target.name} at pos ${idx}`);
      }
      const token: Token<any> = getToken(target, idx) || type;
      let provider = this.providers.get(token);
      if (provider === undefined) {
        provider = this.getProvider<T>(token, true);
      }
      return this.injectUsingProvider(token, provider!);
    });
  }
}

export default Container;
