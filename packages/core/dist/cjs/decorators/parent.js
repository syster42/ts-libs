"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
require("reflect-metadata");
const parent_container_js_1 = __importDefault(require("../ioc/tokens/parent-container.js"));
const inject_js_1 = __importDefault(require("./inject.js"));
/**
 * injects the parent container
 */
const Parent = () => (0, inject_js_1.default)(parent_container_js_1.default);
exports.Parent = Parent;
exports.default = exports.Parent;
