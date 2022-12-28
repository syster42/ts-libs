import annotate from './annotate.js';
/**
 * Decorator to set a HTTP method for a method.
 * @param {string} httpMethod
 * @returns {any}
 */
// TODO use union type for http methods
export const method = (httpMethod) => annotate('httpMethod', httpMethod.toLowerCase());
export default method;
