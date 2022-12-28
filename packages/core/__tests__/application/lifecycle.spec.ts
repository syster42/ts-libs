import { Lifecycle } from '../../src/index.js';

describe('lifecycle', () => {
  it('should be defined', () => {
    expect(Lifecycle).toBeDefined();
  });

  it('should be able to start', () => {
    const lifecycle = new Lifecycle();
    const prom = new Promise<void>((resolve) => {
      lifecycle.onStart = (): Promise<void> => {
        resolve();
        return Promise.resolve();
      };
      lifecycle.start();
    });
    expect(prom).resolves.toBeUndefined();
  });

  it('should be able to stop', () => {
    const lifecycle = new Lifecycle();
    const prom = new Promise<void>((resolve) => {
      lifecycle.onStop = (): Promise<void> => {
        resolve();
        return Promise.resolve();
      };
      lifecycle.stop();
    });
    expect(prom).resolves.toBeUndefined();
  });

  it('should be able to start and stop', () => {
    const lifecycle = new Lifecycle();
    const startedProm = new Promise<void>((resolve) => {
      lifecycle.onStart = (): Promise<void> => {
        lifecycle.stop();
        resolve();
        return Promise.resolve();
      };
    });
    const stoppedProm = new Promise<void>((resolve) => {
      lifecycle.onStop = (): Promise<void> => {
        resolve();
        return Promise.resolve();
      };
    });
    lifecycle.start();
    expect(startedProm).resolves.toBeUndefined();
    expect(stoppedProm).resolves.toBeUndefined();
  });

  it('should throw with default start callback;', () => {
    const lifecycle = new Lifecycle();
    const originalCb = lifecycle.onStart;
    const prom = new Promise<void>((_resolve, reject) => {
      lifecycle.onStart = (): Promise<void> => originalCb().catch(reject);
    });
    lifecycle.start();
    expect(prom).rejects.toBeUndefined();
  });

  it('should throw with default stop callback;', () => {
    const lifecycle = new Lifecycle();
    const originalCb = lifecycle.onStop;
    const prom = new Promise<void>((_resolve, reject) => {
      lifecycle.onStop = (): Promise<void> => originalCb().catch(reject);
    });
    lifecycle.stop();
    expect(prom).rejects.toBeUndefined();
  });

  it('should toggle started', () => {
    const lifecycle = new Lifecycle();
    lifecycle.started();
    const anyLife = lifecycle as any;
    expect(anyLife.stateMachine.currentState).toBe(anyLife.runningState);
  });

  it('should toggle stopping', async () => {
    const lifecycle = new Lifecycle();
    const prom = new Promise<void>((resolve) => {
      lifecycle.onStart = (): Promise<void> => {
        lifecycle.stopping();
        lifecycle.stop();
        resolve();
        return Promise.resolve();
      };
    });
    const stopProm = new Promise<void>((resolve) => {
      lifecycle.onStop = (): Promise<void> => {
        resolve();
        return Promise.resolve();
      };
    });
    lifecycle.start();
    expect(prom).resolves.toBeUndefined();
    expect(stopProm).resolves.toBeUndefined();
  });
});
