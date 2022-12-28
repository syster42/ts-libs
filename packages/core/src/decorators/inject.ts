import 'reflect-metadata';
import INJECTION_KEY from '../symbols/injection-key.js';
import Token from '../types/token.js';

/**
 * Decorator to inject a dependency
 *
 */
export const Inject =
  (token: Token<any>) =>
  (target: any, _: any, idx: number): any => {
    Reflect.defineMetadata(INJECTION_KEY, token, target, `idx-${idx}`);
    return target;
  };

export default Inject;
