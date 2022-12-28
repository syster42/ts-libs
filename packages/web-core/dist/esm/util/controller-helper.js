/* istanbul ignore file */
// FIXME write tests
/**
 * filter all controllers with hosted scope
 * @param {Controller[]} controllers
 * @returns {Promise<IHostedScope[]>}
 */
export const filterHosted = async (controllers) => controllers.filter((c) => c.startAsync !== undefined && c.stopAsync !== undefined);
/**
 * start all controllers with hosted scope
 * @param {IHostedScope[]} hosted
 * @returns {Promise<void[]>}
 */
// TODO use throttle
export const startAll = async (hosted) => Promise.all(hosted.map((c) => c.startAsync()));
/**
 * stop all controllers with hosted scope
 * @param {IHostedScope[]} hosted
 * @returns {Promise<void[]>}
 */
// TODO use throttle
export const stopAll = async (hosted) => Promise.all(hosted.map((h) => h.stopAsync()));
