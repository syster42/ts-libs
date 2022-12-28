"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
/* eslint-disable no-underscore-dangle */
require("reflect-metadata");
const core_1 = require("@syster42/core");
/**
 * Marks a class as a controller.
 * @param {string} path
 * @returns {(target: Ctor<Controller>) => any}
 */
const controller = (path) => (target) => {
    // eslint-disable-next-line no-param-reassign
    target.prototype.__prefix = () => path || '';
    return (0, core_1.Singleton)(true)(target);
};
exports.controller = controller;
exports.default = exports.controller;
