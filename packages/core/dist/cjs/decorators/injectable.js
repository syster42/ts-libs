"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
require("reflect-metadata");
const injection_scope_js_1 = __importDefault(require("../enums/injection-scope.js"));
const injectable_key_js_1 = __importDefault(require("../symbols/injectable-key.js"));
const injection_scope_js_2 = __importDefault(require("../symbols/injection-scope.js"));
/**
 * Decorator to mark a class as injectable
 *
 */
const Injectable = () => (target) => {
    if (Reflect.getMetadata(injection_scope_js_2.default, target) === undefined) {
        Reflect.defineMetadata(injection_scope_js_2.default, injection_scope_js_1.default.NONE, target);
    }
    Reflect.defineMetadata(injectable_key_js_1.default, true, target);
    return target;
};
exports.Injectable = Injectable;
exports.default = exports.Injectable;
