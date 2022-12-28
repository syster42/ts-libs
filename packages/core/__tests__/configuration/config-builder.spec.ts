import ConfigBuilder from '../../src/configuration/config-builder.js';
import MockConfigSource from '../__mocks__/mock-config-source.js';

describe('config-builder', () => {
  it('should be defined', () => {
    expect(new ConfigBuilder()).toBeDefined();
  });

  it('should be able to add config sources', () => {
    const builder = new ConfigBuilder();
    const source = new MockConfigSource();
    expect(builder.add(source)).toBe(builder);
  });

  it('should be able to build config sources', () => {
    const builder = new ConfigBuilder();
    const source = new MockConfigSource();
    builder.add(source);
    expect(builder.build()).toBeDefined();
  });

  it('should be able to get all config sources', () => {
    const builder = new ConfigBuilder();
    const source = new MockConfigSource();
    builder.add(source);
    expect(builder.sources()).toEqual([source]);
  });
});
