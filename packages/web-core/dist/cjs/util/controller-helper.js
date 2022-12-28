"use strict";
/* istanbul ignore file */
// FIXME write tests
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopAll = exports.startAll = exports.filterHosted = void 0;
/**
 * filter all controllers with hosted scope
 * @param {Controller[]} controllers
 * @returns {Promise<IHostedScope[]>}
 */
const filterHosted = async (controllers) => controllers.filter((c) => c.startAsync !== undefined && c.stopAsync !== undefined);
exports.filterHosted = filterHosted;
/**
 * start all controllers with hosted scope
 * @param {IHostedScope[]} hosted
 * @returns {Promise<void[]>}
 */
// TODO use throttle
const startAll = async (hosted) => Promise.all(hosted.map((c) => c.startAsync()));
exports.startAll = startAll;
/**
 * stop all controllers with hosted scope
 * @param {IHostedScope[]} hosted
 * @returns {Promise<void[]>}
 */
// TODO use throttle
const stopAll = async (hosted) => Promise.all(hosted.map((h) => h.stopAsync()));
exports.stopAll = stopAll;
