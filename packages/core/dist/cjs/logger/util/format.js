"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const log_level_js_1 = __importDefault(require("../../enums/log-level.js"));
/**
 * format logging string
 * @type {*}
 */
exports.format = {
    date: (_fmt) => ({ date }) => date.toISOString(),
    level: () => ({ level }) => log_level_js_1.default[level],
    location: () => ({ location }) => location,
    message: () => ({ message }) => message,
    text: (text) => () => text,
    newLine: () => () => '\n',
    pid: () => () => `${process.pid}`,
};
exports.default = exports.format;
