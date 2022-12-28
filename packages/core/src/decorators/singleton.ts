import 'reflect-metadata';
import InjectionScope from '../enums/injection-scope.js';
import IocError from '../errors/ioc-error.js';
import INJECTION_SCOPE from '../symbols/injection-scope.js';
import Injectable from './injectable.js';

/**
 * Decorator to mark a class as singleton
 *
 */
export const Singleton =
  (force = false) =>
  (target: any): any => {
    if (!force && Reflect.getMetadata(INJECTION_SCOPE, target) !== undefined) {
      throw new IocError("Can't set Singleton scope, scope already set");
    }
    Reflect.defineMetadata(INJECTION_SCOPE, InjectionScope.SINGLETON, target);
    return Injectable()(target);
  };

export default Singleton;
