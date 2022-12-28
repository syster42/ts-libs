/* eslint-disable no-underscore-dangle */
import 'reflect-metadata';
import { Singleton } from '@syster42/core';
/**
 * Marks a class as a controller.
 * @param {string} path
 * @returns {(target: Ctor<Controller>) => any}
 */
export const controller = (path) => (target) => {
    // eslint-disable-next-line no-param-reassign
    target.prototype.__prefix = () => path || '';
    return Singleton(true)(target);
};
export default controller;
