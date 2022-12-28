import 'reflect-metadata';
import IHostedScope from '../interfaces/hosted-scope.js';
import Ctor from '../types/ctor.js';
/**
 * Decorator to mark a class as hosted
 *
 */
export declare const Hosted: (force?: boolean) => (target: Ctor<IHostedScope>) => any;
export default Hosted;
//# sourceMappingURL=hosted.d.ts.map