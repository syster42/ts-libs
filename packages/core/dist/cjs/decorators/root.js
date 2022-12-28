"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
require("reflect-metadata");
const root_container_js_1 = __importDefault(require("../ioc/tokens/root-container.js"));
const inject_js_1 = __importDefault(require("./inject.js"));
/**
 * injects the root container
 */
const Root = () => (0, inject_js_1.default)(root_container_js_1.default);
exports.Root = Root;
exports.default = exports.Root;
