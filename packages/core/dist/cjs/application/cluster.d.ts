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
export declare class Cluster {
    private logger;
    /**
     * indicates whether the application is shutting down
     *
     * @private
     * @type {boolean}
     * @memberof Cluster
     */
    private isShuttingDown;
    /**
     * holds the number of cpus
     *
     * @private
     * @type {number}
     * @memberof Cluster
     */
    private readonly numCpu;
    /**
     * maximum allowed number of processes
     *
     * @private
     * @type {number}
     * @memberof Cluster
     */
    private readonly maxProcs;
    /**
     * minimum number of processes
     *
     * @private
     * @type {number}
     * @memberof Cluster
     */
    private minProcs;
    /**
     *
     * map of workers
     * @private
     * @type {Map<Worker, IWorkerData>}
     * @memberof Cluster
     */
    private workers;
    /**
     * Creates an instance of Cluster.
     * @param {Logger} logger
     * @memberof Cluster
     */
    constructor(logger: Logger);
    static get isPrimary(): boolean;
    get isStandAlone(): boolean;
    /**
     * get the maximum number of possible processes
     *
     * @return {*}  {number}
     * @memberof Cluster
     */
    getMaxProcs(): number;
    /**
     * runs the given function in a clustered environment
     *
     * @param {() => any} fn
     * @return {*}  {Promise<any>}
     * @memberof Cluster
     */
    runClustered(fn: () => any): Promise<any>;
    /**
     * shuts down the cluster
     *
     * @return {*}  {Promise<void>}
     * @memberof Cluster
     */
    shutdown(): Promise<void>;
    /**
     * will get called if a worker dies
     *
     * @private
     * @param {Worker} worker
     * @memberof Cluster
     */
    private workerKilled;
    /**
     * adds a worker
     *
     * @private
     * @memberof Cluster
     */
    private addWorker;
}
export default Cluster;
//# sourceMappingURL=cluster.d.ts.map