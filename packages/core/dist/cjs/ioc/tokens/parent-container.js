"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentContainerToken = void 0;
const injection_token_js_1 = __importDefault(require("../injection-token.js"));
/**
 * Token to hold the parent container
 *
 */
exports.ParentContainerToken = new injection_token_js_1.default('__PARENT__');
exports.default = exports.ParentContainerToken;
