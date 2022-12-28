/* eslint-disable class-methods-use-this */
import { Hosted } from '../../src/index.js';

@Hosted()
export class MockHosted {
  public async startAsync(): Promise<void> {
    return Promise.resolve();
  }

  public async stopAsync(): Promise<void> {
    return Promise.resolve();
  }
}

export default MockHosted;
