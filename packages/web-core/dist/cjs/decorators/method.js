"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = void 0;
const annotate_js_1 = __importDefault(require("./annotate.js"));
/**
 * Decorator to set a HTTP method for a method.
 * @param {string} httpMethod
 * @returns {any}
 */
// TODO use union type for http methods
const method = (httpMethod) => (0, annotate_js_1.default)('httpMethod', httpMethod.toLowerCase());
exports.method = method;
exports.default = exports.method;
