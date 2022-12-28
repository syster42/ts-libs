import { Container, IocError, Provider } from '../../src/index.js';
import MockConfigProvider from '../__mocks__/mock-config-provider.js';
import { mockFactoryInject, MockFactoryInjectClass, mockFactoryInjectToken } from '../__mocks__/mock-factory-inject.js';
import MockInvalidInject from '../__mocks__/mock-invalid-inject.js';
import MockRecursiveInject from '../__mocks__/mock-recursive-inject.js';
import MockSingleton from '../__mocks__/mock-singleton.js';
import MockTransient from '../__mocks__/mock-transient.js';

describe('ioc', () => {
  it('should be defined', () => {
    expect(Container).toBeDefined();
  });

  it('should be able to create a new container', () => {
    expect(new Container()).toBeDefined();
  });

  it('should get provider', () => {
    const container = new Container();
    const provider: Provider<MockSingleton> = {
      provide: MockSingleton,
      class: MockSingleton,
    };

    container.addProvider(provider);

    expect(container.getProvider(MockSingleton)).toStrictEqual(provider);
  });

  it('should get provider from ancestors', () => {
    const container = new Container();
    const provider: Provider<MockSingleton> = {
      provide: MockSingleton,
      class: MockSingleton,
    };
    container.addProvider(provider);

    const subContainer = new Container({
      parent: container,
    });

    expect(subContainer.getProvider(MockSingleton, true)).toStrictEqual(provider);
  });

  it('should throw if recursive inject', () => {
    const container = new Container();
    try {
      container.addProvider({
        class: MockRecursiveInject,
        provide: MockInvalidInject,
      });
    } catch (e) {
      expect(e instanceof IocError).toBe(true);
    }
  });

  it('should throw if no provider', () => {
    const container = new Container();
    try {
      container.inject(MockRecursiveInject);
    } catch (e) {
      expect(e instanceof IocError).toBe(true);
    }
  });

  it('should throw if not injectable', () => {
    const container = new Container();
    try {
      container.addProvider({
        class: MockConfigProvider,
        provide: MockConfigProvider,
      });
    } catch (e) {
      expect(e instanceof IocError).toBe(true);
    }
  });

  it('should create transient', () => {
    const container = new Container();
    container.addProvider({
      class: MockTransient,
      provide: MockTransient,
    });
    const cls = container.inject(MockTransient);
    expect(cls).toBeInstanceOf(MockTransient);
  });

  it('should inject factory', () => {
    const container = new Container();

    container.addProvider({
      factory: mockFactoryInject,
      provide: mockFactoryInjectToken,
    });

    container.addProvider({
      class: MockFactoryInjectClass,
      provide: MockFactoryInjectClass,
    });

    const cls = container.inject(MockFactoryInjectClass);
    expect(cls).toBeInstanceOf(MockFactoryInjectClass);
    expect(cls.inject).toBe('test');
  });
});
