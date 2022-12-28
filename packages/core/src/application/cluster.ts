import cluster, { Worker } from 'node:cluster';
import os from 'node:os';
import Injectable from '../decorators/injectable.js';
import IWorkerData from '../interfaces/worker-data.js';
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
@Injectable()
export class Cluster {
  /**
   * indicates whether the application is shutting down
   *
   * @private
   * @type {boolean}
   * @memberof Cluster
   */
  private isShuttingDown = false;

  /**
   * holds the number of cpus
   *
   * @private
   * @type {number}
   * @memberof Cluster
   */
  private readonly numCpu: number = -1;

  /**
   * maximum allowed number of processes
   *
   * @private
   * @type {number}
   * @memberof Cluster
   */
  private readonly maxProcs: number = -1;

  /**
   * minimum number of processes
   *
   * @private
   * @type {number}
   * @memberof Cluster
   */
  private minProcs = 1;

  /**
   *
   * map of workers
   * @private
   * @type {Map<Worker, IWorkerData>}
   * @memberof Cluster
   */
  private workers: Map<Worker, IWorkerData>;

  /**
   * Creates an instance of Cluster.
   * @param {Logger} logger
   * @memberof Cluster
   */
  constructor(private logger: Logger) {
    this.workers = new Map();
    this.numCpu = os.cpus().length;
    const maxProcs = this.getMaxProcs();
    this.maxProcs = Math.min(Math.max(maxProcs, 1), this.numCpu);
  }

  public static get isPrimary(): boolean {
    return cluster.isPrimary;
  }

  public get isStandAlone(): boolean {
    return this.minProcs === this.maxProcs;
  }

  /**
   * get the maximum number of possible processes
   *
   * @return {*}  {number}
   * @memberof Cluster
   */
  public getMaxProcs(): number {
    return process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC !== undefined ? Number(process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC) : this.numCpu;
  }

  /**
   * runs the given function in a clustered environment
   *
   * @param {() => any} fn
   * @return {*}  {Promise<any>}
   * @memberof Cluster
   */
  public async runClustered(fn: () => any): Promise<any> {
    if (Cluster.isPrimary) {
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
  public async shutdown(): Promise<void> {
    this.isShuttingDown = true;
    const workerProms: Promise<void>[] = [];
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
  private workerKilled(worker: Worker): void {
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
  private addWorker(): void {
    if (!this.isShuttingDown && this.workers.size < this.maxProcs) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /// @ts-ignore
      const worker: cluster.Worker = cluster.fork(process.env);
      let shutdownResolver!: () => void;
      const promise: Promise<void> = new Promise((res) => {
        shutdownResolver = res as () => void;
      });
      this.workers.set(worker, {
        promise,
        shutdownResolver,
      });
      this.logger.info(`Spawned Process (${worker.process.pid})`);
    }
  }
}

export default Cluster;
