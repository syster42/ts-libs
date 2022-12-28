import { IHostedScope } from '@syster42/core';
import Controller from '../controller.js';
/**
 * filter all controllers with hosted scope
 * @param {Controller[]} controllers
 * @returns {Promise<IHostedScope[]>}
 */
export declare const filterHosted: (controllers: Controller[]) => Promise<IHostedScope[]>;
/**
 * start all controllers with hosted scope
 * @param {IHostedScope[]} hosted
 * @returns {Promise<void[]>}
 */
export declare const startAll: (hosted: IHostedScope[]) => Promise<void[]>;
/**
 * stop all controllers with hosted scope
 * @param {IHostedScope[]} hosted
 * @returns {Promise<void[]>}
 */
export declare const stopAll: (hosted: IHostedScope[]) => Promise<void[]>;
//# sourceMappingURL=controller-helper.d.ts.map