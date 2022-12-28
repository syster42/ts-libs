import IClassProvider from '../interfaces/class-provider.js';
import IFactoryProvider from '../interfaces/factory-provider.js';
import IValueProvider from '../interfaces/value-provider.js';

export type Provider<T> = IClassProvider<T> | IValueProvider<T> | IFactoryProvider<T>;

export default Provider;
