"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Cluster_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cluster = void 0;
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_os_1 = __importDefault(require("node:os"));
const injectable_js_1 = __importDefault(require("../decorators/injectable.js"));
const logger_js_1 = __importDefault(require("../logger/logger.js"));
/**
 * Cluster class
 *
 * ```typescript
 * import { Cluster } from '@syster42/core';
 * const cluster = new Cluster(logger);
 * await cluster.runClustered(async () => {
      // ...
    }));
 * ```
 * @class Cluster
 * @Injectable
 */
let Cluster = Cluster_1 = class Cluster {
    /**
     * Creates an instance of Cluster.
     * @param {Logger} logger
     * @memberof Cluster
     */
    constructor(logger) {
        this.logger = logger;
        /**
         * indicates whether the application is shutting down
         *
         * @private
         * @type {boolean}
         * @memberof Cluster
         */
        this.isShuttingDown = false;
        /**
         * holds the number of cpus
         *
         * @private
         * @type {number}
         * @memberof Cluster
         */
        this.numCpu = -1;
        /**
         * maximum allowed number of processes
         *
         * @private
         * @type {number}
         * @memberof Cluster
         */
        this.maxProcs = -1;
        /**
         * minimum number of processes
         *
         * @private
         * @type {number}
         * @memberof Cluster
         */
        this.minProcs = 1;
        this.workers = new Map();
        this.numCpu = node_os_1.default.cpus().length;
        const maxProcs = this.getMaxProcs();
        this.maxProcs = Math.min(Math.max(maxProcs, 1), this.numCpu);
    }
    static get isPrimary() {
        return node_cluster_1.default.isPrimary;
    }
    get isStandAlone() {
        return this.minProcs === this.maxProcs;
    }
    /**
     * get the maximum number of possible processes
     *
     * @return {*}  {number}
     * @memberof Cluster
     */
    getMaxProcs() {
        return process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC !== undefined ? Number(process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC) : this.numCpu;
    }
    /**
     * runs the given function in a clustered environment
     *
     * @param {() => any} fn
     * @return {*}  {Promise<any>}
     * @memberof Cluster
     */
    async runClustered(fn) {
        if (Cluster_1.isPrimary) {
            this.logger.info(`Starting ${this.maxProcs} child processes`);
            for (let i = 0; i < this.maxProcs; i++) {
                this.addWorker();
            }
            node_cluster_1.default.on('exit', this.workerKilled.bind(this));
        }
        await fn();
    }
    /**
     * shuts down the cluster
     *
     * @return {*}  {Promise<void>}
     * @memberof Cluster
     */
    async shutdown() {
        this.isShuttingDown = true;
        const workerProms = [];
        this.workers.forEach(({ promise }, worker) => {
            workerProms.push(promise);
            worker.kill();
        });
        await Promise.all(workerProms);
    }
    /**
     * will get called if a worker dies
     *
     * @private
     * @param {Worker} worker
     * @memberof Cluster
     */
    workerKilled(worker) {
        var _a;
        if (this.workers.has(worker)) {
            this.logger.info(`Killed Process (${worker.process.pid})`);
            (_a = this.workers.get(worker)) === null || _a === void 0 ? void 0 : _a.shutdownResolver();
            this.workers.delete(worker);
        }
        this.addWorker();
    }
    /**
     * adds a worker
     *
     * @private
     * @memberof Cluster
     */
    addWorker() {
        if (!this.isShuttingDown && this.workers.size < this.maxProcs) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /// @ts-ignore
            const worker = node_cluster_1.default.fork(process.env);
            let shutdownResolver;
            const promise = new Promise((res) => {
                shutdownResolver = res;
            });
            this.workers.set(worker, {
                promise,
                shutdownResolver,
            });
            this.logger.info(`Spawned Process (${worker.process.pid})`);
        }
    }
};
Cluster = Cluster_1 = __decorate([
    (0, injectable_js_1.default)(),
    __metadata("design:paramtypes", [logger_js_1.default])
], Cluster);
exports.Cluster = Cluster;
exports.default = Cluster;
