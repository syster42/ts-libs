import { ConfigProvider } from '../../src/index.js';

export class MockConfigProvider extends ConfigProvider {
  public async load(): Promise<void> {
    this.set('MockConfig', 'bar');
  }
}

export default MockConfigProvider;
