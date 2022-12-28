/**
 * checks if the given target is a primitive
 *
 * @param {*} target
 */
export const isPrimitive = (target) => typeof target === 'string' || typeof target === 'number' || typeof target === 'boolean';
/**
 * checks if the given target is a primitive class
 *
 * @param {*} target
 */
/* istanbul ignore next */
export const isPrimitiveCtor = (target) => isPrimitive(target) || target instanceof String || target instanceof Number || target instanceof Boolean;
