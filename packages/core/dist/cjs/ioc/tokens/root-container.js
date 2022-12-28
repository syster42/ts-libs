"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootContainerToken = void 0;
const injection_token_js_1 = __importDefault(require("../injection-token.js"));
/**
 * Token to hold the root container
 *
 */
exports.RootContainerToken = new injection_token_js_1.default('__ROOT__');
exports.default = exports.RootContainerToken;
