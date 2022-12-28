import { ChangeSetType, ConfigProvider } from '../../src/index.js';

describe('config-provider', () => {
  it('should be defined', () => {
    expect(ConfigProvider).toBeDefined();
  });

  it('should be able to load config', () => {
    const provider = new ConfigProvider();
    expect(provider.load()).resolves.toBeUndefined();
  });

  it('should be able to set value', () => {
    const provider = new ConfigProvider();
    provider.set('foo', 'bar');
    expect((provider as any).data.foo).toBe('bar');
  });

  it('should be able to set value when not in config', () => {
    const provider = new ConfigProvider();
    provider.set('new', 'new');
    expect((provider as any).data.new).toBe('new');
  });

  it('should be able mark as deleted', () => {
    const provider = new ConfigProvider();
    provider.set('new', undefined);
    expect((provider as any).data.new).toBe(undefined);
  });

  it('should be now change', () => {
    const provider = new ConfigProvider();
    provider.set('new', 'new');
    provider.set('new', undefined);
    provider.set('new', 'new');
    const changes = provider.set('new', 'new');
    expect(changes.type).toBe(ChangeSetType.NONE);

    provider.finish([changes, provider.set('new', 'new2')]);
  });

  it('should be able to get value', () => {
    const provider = new ConfigProvider();
    provider.set('foo', 'bar');
    expect(provider.tryGet('foo')).toBe('bar');
  });
});
