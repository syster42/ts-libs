import { ConfigBuilder } from '../../src/index.js';
import MockConfigSource from '../__mocks__/mock-config-source.js';

describe('config-source', () => {
  it('should be defined', () => {
    expect(MockConfigSource).toBeDefined();
  });

  it('should be able to build', () => {
    const source = new MockConfigSource();
    expect(source.build(new ConfigBuilder())).toBeDefined();
  });
});
