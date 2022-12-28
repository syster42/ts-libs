import 'reflect-metadata';
import InjectionScope from '../enums/injection-scope.js';
import INJECTABLE_KEY from '../symbols/injectable-key.js';
import INJECTION_SCOPE from '../symbols/injection-scope.js';

/**
 * Decorator to mark a class as injectable
 *
 */
export const Injectable =
  () =>
  (target: any): any => {
    if (Reflect.getMetadata(INJECTION_SCOPE, target) === undefined) {
      Reflect.defineMetadata(INJECTION_SCOPE, InjectionScope.NONE, target);
    }
    Reflect.defineMetadata(INJECTABLE_KEY, true, target);
    return target;
  };

export default Injectable;
