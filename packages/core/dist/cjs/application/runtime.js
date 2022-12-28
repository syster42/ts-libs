"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
const injection_scope_js_1 = __importDefault(require("../enums/injection-scope.js"));
const lifecycle_js_1 = __importDefault(require("./lifecycle.js"));
/**
 * Runtime class
 *
 * ```typescript
 * import { Runtime } from '@syster42/core';
 * const runtime = new Runtime(container);
 * await this.runtime.start();
 * ```
 * @class
 */
class Runtime {
    /**
     * Creates an instance of Runtime.
     * @param {Container} container
     * @memberof Runtime
     */
    constructor(container) {
        this.container = container;
        this.stoppedPromise = new Promise((res) => {
            this.stoppedResolver = res;
        });
        process.nextTick(() => this.tick());
        this.lifecycle = new lifecycle_js_1.default();
        this.lifecycle.onStart = this.onStart.bind(this);
        this.lifecycle.onStop = this.onStop.bind(this);
        process.on('SIGINT', () => this.stop());
        process.on('SIGTERM', () => this.stop());
        process.on('SIGQUIT', () => this.stop());
    }
    /**
     * stops the runtime
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    async stop() {
        this.lifecycle.stop();
        return this.stoppedPromise;
    }
    /**
     * starts the runtime
     *
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    async start() {
        this.lifecycle.start();
        return this.stoppedPromise;
    }
    /**
     * tick to update the state machine
     *
     * @private
     * @memberof Runtime
     */
    tick() {
        var _a;
        if (this) {
            process.nextTick(this.tick);
            (_a = this.lifecycle) === null || _a === void 0 ? void 0 : _a.update();
        }
    }
    /**
     * retrieve hosted providers
     *
     * @private
     * @return {*}  {((IHostedScope | null)[])}
     * @memberof Runtime
     */
    getHostedProviders() {
        var _a;
        return (_a = this.container
            .getProviders()) === null || _a === void 0 ? void 0 : _a.filter((provider) => provider.scope === injection_scope_js_1.default.HOSTED).map((provider) => provider.scopedValue);
    }
    /**
     * calls startAsync on all hosted providers
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    // eslint-disable-next-line class-methods-use-this
    async startAsync() {
        const hostedProviders = this.getHostedProviders();
        const proms = hostedProviders.map((provider) => provider === null || provider === void 0 ? void 0 : provider.startAsync());
        await Promise.all(proms);
    }
    /**
     * calls stopAsync on all hosted providers
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    async stopAsync() {
        const hostedProviders = this.getHostedProviders();
        const proms = hostedProviders.map((provider) => provider === null || provider === void 0 ? void 0 : provider.stopAsync());
        await Promise.all(proms);
        this.stoppedResolver();
    }
    /**
     * callback for start
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    async onStart() {
        await this.startAsync();
    }
    /**
     * callback for stop
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof Runtime
     */
    async onStop() {
        await this.stopAsync();
    }
}
exports.Runtime = Runtime;
exports.default = Runtime;
