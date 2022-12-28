import 'reflect-metadata';
import { Ctor } from '@syster42/core';
import Controller from '../controller.js';
/**
 * Marks a class as a controller.
 * @param {string} path
 * @returns {(target: Ctor<Controller>) => any}
 */
export declare const controller: (path?: string) => (target: Ctor<Controller>) => any;
export default controller;
//# sourceMappingURL=controller.d.ts.map