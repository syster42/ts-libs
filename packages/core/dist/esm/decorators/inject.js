import 'reflect-metadata';
import INJECTION_KEY from '../symbols/injection-key.js';
/**
 * Decorator to inject a dependency
 *
 */
export const Inject = (token) => (target, _, idx) => {
    Reflect.defineMetadata(INJECTION_KEY, token, target, `idx-${idx}`);
    return target;
};
export default Inject;
