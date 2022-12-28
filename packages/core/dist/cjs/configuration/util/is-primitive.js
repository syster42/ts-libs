"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitiveCtor = exports.isPrimitive = void 0;
/**
 * checks if the given target is a primitive
 *
 * @param {*} target
 */
const isPrimitive = (target) => typeof target === 'string' || typeof target === 'number' || typeof target === 'boolean';
exports.isPrimitive = isPrimitive;
/**
 * checks if the given target is a primitive class
 *
 * @param {*} target
 */
/* istanbul ignore next */
const isPrimitiveCtor = (target) => (0, exports.isPrimitive)(target) || target instanceof String || target instanceof Number || target instanceof Boolean;
exports.isPrimitiveCtor = isPrimitiveCtor;
