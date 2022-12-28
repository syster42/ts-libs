"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accepts = void 0;
const annotate_js_1 = __importDefault(require("./annotate.js"));
/**
 * Decorator to set accepted mime types for a method.
 * @param {string} mimeType
 * @returns {any}
 */
const accepts = (mimeType) => (0, annotate_js_1.default)('accepts', mimeType.toLowerCase());
exports.accepts = accepts;
exports.default = exports.accepts;
