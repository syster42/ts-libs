import annotate from './annotate.js';

/**
 * Decorator to set a route for a method
 * @param {string} path
 * @returns {any}
 */
export const route = (path: string): any => annotate('route', path);
export default route;
