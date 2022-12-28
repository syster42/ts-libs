"use strict";
/* istanbul ignore file */
// FIXME write tests
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectFolder = void 0;
/**
 * injects all files in a folder to a container
 * @param {string} path
 * @param {Container} container
 * @param {Logger} logger
 * @returns {Promise<T[]>}
 */
const injectFolder = async (path, container, logger) => {
    var _a;
    try {
        const controllers = await (_a = path, Promise.resolve().then(() => __importStar(require(_a))));
        const instances = [];
        Object.keys(controllers).forEach((c) => {
            const ctrl = controllers[c];
            logger.info(`Injecting file with DI: ${c}.`);
            const provider = container
                .addProvider({
                provide: ctrl,
                class: ctrl,
            })
                .getProvider(ctrl);
            if (provider && provider.scopedValue) {
                container.inject(ctrl);
                instances.push(provider.scopedValue);
            }
        });
        return instances;
    }
    catch (e) {
        logger.error('Error injecting folders', e);
        throw e;
    }
};
exports.injectFolder = injectFolder;
exports.default = exports.injectFolder;
