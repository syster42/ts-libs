"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const annotate_js_1 = __importDefault(require("./annotate.js"));
/**
 * Decorator to set a route for a method
 * @param {string} path
 * @returns {any}
 */
const route = (path) => (0, annotate_js_1.default)('route', path);
exports.route = route;
exports.default = exports.route;
