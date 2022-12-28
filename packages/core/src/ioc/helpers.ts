import 'reflect-metadata';
import InjectionScope from '../enums/injection-scope.js';
import IClassProvider from '../interfaces/class-provider.js';
import IFactoryProvider from '../interfaces/factory-provider.js';
import IProvider from '../interfaces/provider.js';
import IValueProvider from '../interfaces/value-provider.js';
import INJECTABLE_KEY from '../symbols/injectable-key.js';
import INJECTION_KEY from '../symbols/injection-key.js';
import INJECTION_SCOPE from '../symbols/injection-scope.js';
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
export function getToken<T>(target: any, idx: number): Token<T> {
  return Reflect.getMetadata(INJECTION_KEY, target, `idx-${idx}`) as Token<T>;
}

/**
 * get the injection scope for target
 *
 * @export
 * @param {*} target
 * @return {*}  {InjectionScope}
 */
export function getScope(target: any): InjectionScope {
  return Reflect.getMetadata(INJECTION_SCOPE, target);
}

/**
 * check if target is injectable
 *
 * @export
 * @template T
 * @param {Ctor<T>} target
 * @return {*}  {boolean}
 */
export function isInjectable<T>(target: Ctor<T>): boolean {
  return Reflect.getMetadata(INJECTABLE_KEY, target) === true;
}

/**
 * check if provider is a class provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IClassProvider<T>}
 */
export function isClassProvider<T>(provider: IProvider<T>): provider is IClassProvider<T> {
  return (provider as IClassProvider<T>).class !== undefined;
}

/**
 * check if provider is a value provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IValueProvider<T>}
 */
export function isValueProvider<T>(provider: IProvider<T>): provider is IValueProvider<T> {
  return (provider as IValueProvider<T>).value !== undefined;
}

/**
 *check if provider is a factory provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IFactoryProvider<T>}
 */
export function isFactoryProvider<T>(provider: IProvider<T>): provider is IFactoryProvider<T> {
  return (provider as IFactoryProvider<T>).factory !== undefined;
}
