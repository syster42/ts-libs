"use strict";
/* eslint-disable no-underscore-dangle */
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotate = void 0;
require("reflect-metadata");
/**
 * Annotates a class with a property.
 * @param {string} annotationName
 * @param args
 * @returns {(target: any, propertyKey: string) => void}
 */
const annotate = (annotationName, ...args) => (target, propertyKey) => {
    if (!target.__annotations) {
        // eslint-disable-next-line no-param-reassign
        target.__annotations = new Map();
    }
    if (!target.__annotations.has(propertyKey)) {
        target.__annotations.set(propertyKey, []);
    }
    target.__annotations.get(propertyKey).push({
        name: annotationName,
        args,
    });
};
exports.annotate = annotate;
exports.default = exports.annotate;
