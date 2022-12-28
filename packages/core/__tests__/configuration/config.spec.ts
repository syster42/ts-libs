import { Config, ConfigBuilder, ConfigProvider, configure, isPrimitiveCtor } from '../../src/index.js';
import MockConfigSource from '../__mocks__/mock-config-source.js';
import MockConfig from '../__mocks__/mock-config.js';

describe('config', () => {
  it('should be defined', () => {
    expect(Config).toBeDefined();
  });

  it('should be able to load configs', () => {
    const provider = new ConfigProvider();

    const config = new Config([provider]);

    expect(config.loaded).resolves.toBeUndefined();
  });

  it('should be able to set value', () => {
    const provider = new ConfigProvider();

    const config = new Config([provider]);

    config.set('foo', 'bar');

    expect(provider.tryGet('foo')).toBe('bar');
  });

  it('should be able to get value', () => {
    const provider = new ConfigProvider();

    const config = new Config([provider]);

    config.set('foo', 'bar');

    expect(config.get('foo')).toBe('bar');
  });

  it('should be able to get value by class', async () => {
    const source = new MockConfigSource();
    const builder = new ConfigBuilder();
    builder.add(source);
    source.build(builder);

    const config = builder.build();
    await config.loaded;

    configure(MockConfig, config);

    expect(config.get(MockConfig)).toStrictEqual(new MockConfig());
  });

  it('should be able to identify primitive ctors', () => {
    // eslint-disable-next-line no-new-wrappers
    expect(isPrimitiveCtor(String())).toBe(true);
    // eslint-disable-next-line no-new-wrappers
    expect(isPrimitiveCtor(Number())).toBe(true);
    // eslint-disable-next-line no-new-wrappers
    expect(isPrimitiveCtor(Boolean())).toBe(true);
  });
});
