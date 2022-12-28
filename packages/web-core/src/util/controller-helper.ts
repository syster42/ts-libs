/* istanbul ignore file */
// FIXME write tests

import { IHostedScope } from '@syster42/core';
import Controller from '../controller.js';

/**
 * filter all controllers with hosted scope
 * @param {Controller[]} controllers
 * @returns {Promise<IHostedScope[]>}
 */
export const filterHosted = async (controllers: Controller[]): Promise<IHostedScope[]> =>
  controllers.filter((c: any) => c.startAsync !== undefined && c.stopAsync !== undefined) as unknown as IHostedScope[];

/**
 * start all controllers with hosted scope
 * @param {IHostedScope[]} hosted
 * @returns {Promise<void[]>}
 */
// TODO use throttle
export const startAll = async (hosted: IHostedScope[]): Promise<void[]> => Promise.all(hosted.map((c) => c.startAsync()));

/**
 * stop all controllers with hosted scope
 * @param {IHostedScope[]} hosted
 * @returns {Promise<void[]>}
 */
// TODO use throttle
export const stopAll = async (hosted: IHostedScope[]): Promise<void[]> => Promise.all(hosted.map((h: IHostedScope) => h.stopAsync()));
