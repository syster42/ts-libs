/* eslint-disable no-underscore-dangle */
import 'reflect-metadata';
import { Ctor, Singleton } from '@syster42/core';
import Controller from '../controller.js';

/**
 * Marks a class as a controller.
 * @param {string} path
 * @returns {(target: Ctor<Controller>) => any}
 */
export const controller =
  (path?: string) =>
  (target: Ctor<Controller>): any => {
    // eslint-disable-next-line no-param-reassign
    target.prototype.__prefix = (): string => path || '';
    return Singleton(true)(target);
  };

export default controller;
