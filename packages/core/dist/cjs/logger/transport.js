"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
const log_level_js_1 = __importDefault(require("../enums/log-level.js"));
/**
 * default config for transport
 * @type {*}
 */
const defaultConfig = {
    formatter: JSON.stringify,
    level: log_level_js_1.default.INFORMATION,
    template: ({ message }) => message,
};
/**
 * abstract transport class
 *
 * @abstract
 * @class Transport
 * @template T
 */
class Transport {
    /**
     * Creates an instance of Transport.
     * @param {T} config
     * @memberof Transport
     */
    constructor(config) {
        this.config = Object.assign(Object.assign({}, defaultConfig), config);
    }
    /**
     * determines if a message should be logged in the configured log-level
     *
     * @param {LogLevel} level
     * @return {*}  {boolean}
     * @memberof Transport
     */
    canLog(level) {
        var _a;
        /* istanbul ignore next */
        return level <= ((_a = this.config.level) !== null && _a !== void 0 ? _a : 0);
    }
    /**
     * formats a string
     *
     * @param {*} value
     * @return {*}  {string}
     * @memberof Transport
     */
    format(value) {
        var _a, _b;
        /* istanbul ignore next */
        return ((_b = (_a = this.config).formatter) === null || _b === void 0 ? void 0 : _b.call(_a, value)) || value;
    }
    /**
     * get formatted message
     *
     * @param {IInfo} info
     * @return {*}  {string}
     * @memberof Transport
     */
    message(info) {
        var _a, _b;
        /* istanbul ignore next */
        return ((_b = (_a = this.config).template) === null || _b === void 0 ? void 0 : _b.call(_a, info)) || info.message;
    }
}
exports.Transport = Transport;
exports.default = Transport;
