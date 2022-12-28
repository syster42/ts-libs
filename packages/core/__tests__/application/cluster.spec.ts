import * as nodeCluster from 'cluster';
import {
  Cluster,
  Logger,
} from '../../src/index.js';

describe('cluster', () => {
  const oldEnv = process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC;

  beforeAll(() => {
    process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC = '1';
  });

  afterAll(() => {
    process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC = oldEnv;
  });

  it('should be defined', () => {
    expect(Cluster).toBeDefined();
  });

  it('should be a instantiated', () => {
    const cluster = new Cluster(new Logger());
    expect(cluster).toBeDefined();
    expect(cluster).toBeInstanceOf(Cluster);
  });

  it('should be primary', () => {
    expect(Cluster.isPrimary).toBe((nodeCluster as any).isPrimary);
  });

  it('should be stand alone', () => {
    const cluster = new Cluster(new Logger());
    expect(cluster.isStandAlone).toBeTruthy();
  });

  it('should be able to get max procs', () => {
    const cluster = new Cluster(new Logger());
    expect(cluster.getMaxProcs()).toBe(1);
  });

  it('should be able to run clustered', async () => {
    const cluster = new Cluster(new Logger());
    let called = false;
    await cluster.runClustered(async () => {
      called = true;
    });
    expect(called).toBeTruthy();
    await cluster.shutdown();
  });

  it('should be able to shutdown', async () => {
    const cluster = new Cluster(new Logger());
    expect(cluster.shutdown()).resolves.toBeUndefined();
  });

  it('should kill subprocess', async () => {
    process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC = '0';
    const cluster = new Cluster(new Logger());
    let called = false;
    await cluster.runClustered(async () => {
      if (Cluster.isPrimary) {
        const worker: nodeCluster.Worker = (nodeCluster as any).fork(process.env) as nodeCluster.Worker;
        let shutdownResolver!: () => {};
        const promise: Promise<void> = new Promise((res) => {
          shutdownResolver = res as () => {};
        });
        (cluster as any).workers.set(worker, {
          promise,
          shutdownResolver,
        });
        worker.kill();
      }
      (cluster as any).isShuttingDown = true;
      return new Promise<void>((res) => {
        setTimeout(() => {
          cluster.shutdown().then(() => {
            called = true;
            res();
          });
        }, 1000);
      });
    });
    expect(called).toBeTruthy();
    await cluster.shutdown();

    process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC = oldEnv;
  });

  it('should run with maxProcs', async () => {
    delete process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC;
    const cluster = new Cluster(new Logger());
    let called = false;
    await cluster.runClustered(async () => {
      called = true;
    });
    expect(called).toBeTruthy();
    await cluster.shutdown();
  });
});
