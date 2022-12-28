import IProvider from './provider.js';
/**
 * value provider interface
 *
 * @export
 * @interface IValueProvider
 * @extends {IProvider<T>}
 * @template T
 */
export interface IValueProvider<T> extends IProvider<T> {
    value: T;
}
export default IValueProvider;
//# sourceMappingURL=value-provider.d.ts.map