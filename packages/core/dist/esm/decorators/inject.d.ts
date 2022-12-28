import 'reflect-metadata';
import Token from '../types/token.js';
/**
 * Decorator to inject a dependency
 *
 */
export declare const Inject: (token: Token<any>) => (target: any, _: any, idx: number) => any;
export default Inject;
//# sourceMappingURL=inject.d.ts.map