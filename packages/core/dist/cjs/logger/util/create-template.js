"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplate = void 0;
/**
 * create template for logging
 *
 * @param {...((info: IInfo) => string)[]} funcs
 */
// eslint-disable-next-line max-len
const createTemplate = (...funcs) => (info) => funcs.reduce((prev, curr) => `${prev}${curr(info)}`, '');
exports.createTemplate = createTemplate;
exports.default = exports.createTemplate;
