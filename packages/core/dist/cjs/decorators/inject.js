"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
require("reflect-metadata");
const injection_key_js_1 = __importDefault(require("../symbols/injection-key.js"));
/**
 * Decorator to inject a dependency
 *
 */
const Inject = (token) => (target, _, idx) => {
    Reflect.defineMetadata(injection_key_js_1.default, token, target, `idx-${idx}`);
    return target;
};
exports.Inject = Inject;
exports.default = exports.Inject;
