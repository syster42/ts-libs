import { Hosted } from '../../src/index.js';

@Hosted()
export class MockMainService {
  public startAsyncCalled = false;

  public stopAsyncCalled = false;

  public async startAsync(): Promise<void> {
    this.startAsyncCalled = true;
    return Promise.resolve();
  }

  public async stopAsync(): Promise<void> {
    this.stopAsyncCalled = true;
    return Promise.resolve();
  }
}

export default MockMainService;
