var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Cluster_1;
import cluster from 'node:cluster';
import os from 'node:os';
import Injectable from '../decorators/injectable.js';
import Logger from '../logger/logger.js';
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
    logger;
    /**
     * indicates whether the application is shutting down
     *
     * @private
     * @type {boolean}
     * @memberof Cluster
     */
    isShuttingDown = false;
    /**
     * holds the number of cpus
     *
     * @private
     * @type {number}
     * @memberof Cluster
     */
    numCpu = -1;
    /**
     * maximum allowed number of processes
     *
     * @private
     * @type {number}
     * @memberof Cluster
     */
    maxProcs = -1;
    /**
     * minimum number of processes
     *
     * @private
     * @type {number}
     * @memberof Cluster
     */
    minProcs = 1;
    /**
     *
     * map of workers
     * @private
     * @type {Map<Worker, IWorkerData>}
     * @memberof Cluster
     */
    workers;
    /**
     * Creates an instance of Cluster.
     * @param {Logger} logger
     * @memberof Cluster
     */
    constructor(logger) {
        this.logger = logger;
        this.workers = new Map();
        this.numCpu = os.cpus().length;
        const maxProcs = this.getMaxProcs();
        this.maxProcs = Math.min(Math.max(maxProcs, 1), this.numCpu);
    }
    static get isPrimary() {
        return cluster.isPrimary;
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
            cluster.on('exit', this.workerKilled.bind(this));
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
        if (this.workers.has(worker)) {
            this.logger.info(`Killed Process (${worker.process.pid})`);
            this.workers.get(worker)?.shutdownResolver();
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
            const worker = cluster.fork(process.env);
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
    Injectable(),
    __metadata("design:paramtypes", [Logger])
], Cluster);
export { Cluster };
export default Cluster;
