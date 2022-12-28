import { ConfigBuilder, ConfigProvider, Ctor, IConfigSource, Injectable } from '../../src/index.js';
import MockConfigProvider from './mock-config-provider.js';
import MockConfig from './mock-config.js';

@Injectable()
export class MockConfigSource implements IConfigSource {
  public configClass: Ctor<MockConfig> = MockConfig;

  // eslint-disable-next-line class-methods-use-this
  build(_builder: ConfigBuilder): ConfigProvider {
    const provider = new MockConfigProvider();
    provider.set('/foo', 'bar');
    provider.set('/bar', 'true');
    provider.set('/count', '1');
    provider.set('/cast', 1234 as any);
    provider.set('/inner/bla', 'bla');
    return provider;
  }
}

export default MockConfigSource;
