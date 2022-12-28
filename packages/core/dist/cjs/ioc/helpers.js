"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFactoryProvider = exports.isValueProvider = exports.isClassProvider = exports.isInjectable = exports.getScope = exports.getToken = void 0;
require("reflect-metadata");
const injectable_key_js_1 = __importDefault(require("../symbols/injectable-key.js"));
const injection_key_js_1 = __importDefault(require("../symbols/injection-key.js"));
const injection_scope_js_1 = __importDefault(require("../symbols/injection-scope.js"));
/**
 * get injection key for target
 *
 * @export
 * @template T
 * @param {*} target
 * @param {number} idx
 * @return {*}  {Token<T>}
 */
function getToken(target, idx) {
    return Reflect.getMetadata(injection_key_js_1.default, target, `idx-${idx}`);
}
exports.getToken = getToken;
/**
 * get the injection scope for target
 *
 * @export
 * @param {*} target
 * @return {*}  {InjectionScope}
 */
function getScope(target) {
    return Reflect.getMetadata(injection_scope_js_1.default, target);
}
exports.getScope = getScope;
/**
 * check if target is injectable
 *
 * @export
 * @template T
 * @param {Ctor<T>} target
 * @return {*}  {boolean}
 */
function isInjectable(target) {
    return Reflect.getMetadata(injectable_key_js_1.default, target) === true;
}
exports.isInjectable = isInjectable;
/**
 * check if provider is a class provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IClassProvider<T>}
 */
function isClassProvider(provider) {
    return provider.class !== undefined;
}
exports.isClassProvider = isClassProvider;
/**
 * check if provider is a value provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IValueProvider<T>}
 */
function isValueProvider(provider) {
    return provider.value !== undefined;
}
exports.isValueProvider = isValueProvider;
/**
 *check if provider is a factory provider
 *
 * @export
 * @template T
 * @param {IProvider<T>} provider
 * @return {*}  {provider is IFactoryProvider<T>}
 */
function isFactoryProvider(provider) {
    return provider.factory !== undefined;
}
exports.isFactoryProvider = isFactoryProvider;
