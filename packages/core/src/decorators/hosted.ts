import 'reflect-metadata';
import InjectionScope from '../enums/injection-scope.js';
import IocError from '../errors/ioc-error.js';
import IHostedScope from '../interfaces/hosted-scope.js';
import INJECTION_SCOPE from '../symbols/injection-scope.js';
import Ctor from '../types/ctor.js';
import Injectable from './injectable.js';

/**
 * Decorator to mark a class as hosted
 *
 */
export const Hosted =
  (force = false) =>
  (target: Ctor<IHostedScope>): any => {
    if (!force && Reflect.getMetadata(INJECTION_SCOPE, target) !== undefined) {
      throw new IocError("Can't set Hosted scope, scope already set");
    }
    if (!target.prototype.startAsync || !target.prototype.stopAsync) {
      throw new IocError('Hosted missing startAsync or stopAsync');
    }
    Reflect.defineMetadata(INJECTION_SCOPE, InjectionScope.HOSTED, target);
    return Injectable()(target);
  };

export default Hosted;
