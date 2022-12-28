import 'reflect-metadata';
import InjectionScope from '../enums/injection-scope.js';
import IClassProvider from '../interfaces/class-provider.js';
import IFactoryProvider from '../interfaces/factory-provider.js';
import IProvider from '../interfaces/provider.js';
import IValueProvider from '../interfaces/value-provider.js';
import Ctor from '../types/ctor.js';
import Token from '../types/token.js';
/**
 * get injection key for target
 *
 * @export
 * @template T
 * @param {*} target
 * @param {number} idx
 * @return {*}  {Token<T>}
 */
export declare function getToken<T>(target: any, idx: number): Token<T>;
/**
 * get the injection scope for target
 *
 * @export
 * @param {*} target
 * @return {*}  {InjectionScope}
 */
export declare function getScope(target: any): InjectionScope;
/**
 * check if target is injectable
 *
 * @export
 * @template T
 * @param {Ctor<T>} target
 * @return {*}  {boolean}
 */
export declare function isInjectable<T>(target: Ctor<T>): boolean;
/**
 * check if provider is a class provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IClassProvider<T>}
 */
export declare function isClassProvider<T>(provider: IProvider<T>): provider is IClassProvider<T>;
/**
 * check if provider is a value provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IValueProvider<T>}
 */
export declare function isValueProvider<T>(provider: IProvider<T>): provider is IValueProvider<T>;
/**
 *check if provider is a factory provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IFactoryProvider<T>}
 */
export declare function isFactoryProvider<T>(provider: IProvider<T>): provider is IFactoryProvider<T>;
//# sourceMappingURL=helpers.d.ts.map