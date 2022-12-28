import 'reflect-metadata';
import INJECTABLE_KEY from '../symbols/injectable-key.js';
import INJECTION_KEY from '../symbols/injection-key.js';
import INJECTION_SCOPE from '../symbols/injection-scope.js';
/**
 * get injection key for target
 *
 * @export
 * @template T
 * @param {*} target
 * @param {number} idx
 * @return {*}  {Token<T>}
 */
export function getToken(target, idx) {
    return Reflect.getMetadata(INJECTION_KEY, target, `idx-${idx}`);
}
/**
 * get the injection scope for target
 *
 * @export
 * @param {*} target
 * @return {*}  {InjectionScope}
 */
export function getScope(target) {
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
export function isInjectable(target) {
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
export function isClassProvider(provider) {
    return provider.class !== undefined;
}
/**
 * check if provider is a value provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IValueProvider<T>}
 */
export function isValueProvider(provider) {
    return provider.value !== undefined;
}
/**
 *check if provider is a factory provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IFactoryProvider<T>}
 */
export function isFactoryProvider(provider) {
    return provider.factory !== undefined;
}
