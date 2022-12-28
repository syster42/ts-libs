"use strict";
// FIXME add tests
/* istanbul ignore file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const fs_1 = require("fs");
const util_1 = require("util");
const log_level_js_1 = __importDefault(require("../../enums/log-level.js"));
const transport_js_1 = __importDefault(require("../transport.js"));
const create_template_js_1 = __importDefault(require("../util/create-template.js"));
const format_js_1 = __importDefault(require("../util/format.js"));
/**
 * default config for file transport
 *  @type {*}
 */
const defaultConfig = {
    level: log_level_js_1.default.INFORMATION,
    template: (0, create_template_js_1.default)(format_js_1.default.date(), format_js_1.default.level(), format_js_1.default.location(), format_js_1.default.text(': '), format_js_1.default.message()),
};
/**
 * file transport class
 *
 * @class File
 * @extends {Transport}
 */
class File extends transport_js_1.default {
    /**
     * Creates an instance of File.
     * @param {IFileConfig} config
     * @memberof File
     */
    constructor(config) {
        const cfg = Object.assign(Object.assign({}, defaultConfig), config);
        super(cfg);
        this.fileStream = (0, fs_1.createWriteStream)(cfg.path);
    }
    /**
     *
     * formats a string with inspect
     * @param {*} value
     * @return {*}  {string}
     * @memberof File
     */
    // eslint-disable-next-line class-methods-use-this
    format(value) {
        if (value !== null && typeof value === 'object') {
            return `, ${(0, util_1.inspect)(value, false, 2, true)}`;
        }
        return `, ${value}`;
    }
    /**
     * logs a message to file
     *
     * @param {{ message: string, level: LogLevel }} { message }
     * @memberof File
     */
    log({ message }) {
        this.fileStream.write(`${message}\n`);
    }
}
exports.File = File;
exports.default = File;
