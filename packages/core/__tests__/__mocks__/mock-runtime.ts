import { Runtime } from '../../src/index.js';

export class MockRuntime extends Runtime {
  public startCalled = false;

  public stopCalled = false;

  // eslint-disable-next-line class-methods-use-this
  public cb = (): Promise<void> => Promise.resolve();

  public async start(): Promise<void> {
    this.startCalled = true;
    super.start();
    await (this as any).startAsync();
    await this.cb();
    await this.stop();
  }

  public async stop(): Promise<void> {
    this.stopCalled = true;
    super.stop();
  }
}

export default MockRuntime;
