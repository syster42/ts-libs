"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
require("reflect-metadata");
const injection_scope_js_1 = __importDefault(require("../enums/injection-scope.js"));
const ioc_error_js_1 = __importDefault(require("../errors/ioc-error.js"));
const injection_scope_js_2 = __importDefault(require("../symbols/injection-scope.js"));
const injectable_js_1 = __importDefault(require("./injectable.js"));
/**
 * Decorator to mark a class as singleton
 *
 */
const Singleton = (force = false) => (target) => {
    if (!force && Reflect.getMetadata(injection_scope_js_2.default, target) !== undefined) {
        throw new ioc_error_js_1.default("Can't set Singleton scope, scope already set");
    }
    Reflect.defineMetadata(injection_scope_js_2.default, injection_scope_js_1.default.SINGLETON, target);
    return (0, injectable_js_1.default)()(target);
};
exports.Singleton = Singleton;
exports.default = exports.Singleton;
