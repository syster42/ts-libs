import {
  Container,
  Hosted,
  IocError,
  RootContainerToken,
  Singleton,
  Transient,
} from '../../src/index.js';
import MockHosted from '../__mocks__/mock-hosted.js';
import MockInjectClass, { MockValueInjector } from '../__mocks__/mock-inject.js';
import MockSingleton from '../__mocks__/mock-singleton.js';
import MockTransient from '../__mocks__/mock-transient.js';

describe('decorators', () => {
  it('should throw when multiple scopes are set on Hosted()', () => {
    try {
      Hosted(false)(MockHosted as any);
    } catch (e: unknown) {
      expect(e instanceof IocError).toBe(true);
      expect(e).toStrictEqual(new IocError('Can\'t set Hosted scope, scope already set'));
    }
  });

  it('should throw when startAsync or stopAsync is missing in Hosted scope', () => {
    try {
      Hosted(true)(MockSingleton as any);
    } catch (e) {
      expect(e instanceof IocError).toBe(true);
      expect(e).toStrictEqual(new IocError('Hosted missing startAsync or stopAsync'));
    }
  });

  it('should throw when multiple scopes are set on Singleton()', () => {
    try {
      Singleton(false)(MockSingleton as any);
    } catch (e: unknown) {
      expect(e instanceof IocError).toBe(true);
      expect(e).toStrictEqual(new IocError('Can\'t set Singleton scope, scope already set'));
    }
  });

  it('should throw when multiple scopes are set on Transient()', () => {
    try {
      Transient()(MockTransient as any);
    } catch (e: unknown) {
      expect(e instanceof IocError).toBe(true);
      expect(e).toStrictEqual(new IocError('Can\'t set Transient scope, scope already set'));
    }
  });

  it('should inject root container', () => {
    const container = new Container();

    container.addProvider({
      provide: RootContainerToken,
      value: container,
    });

    container.addProvider({
      provide: MockValueInjector,
      value: 'test',
    });

    container.addProvider({
      provide: MockInjectClass,
      class: MockInjectClass,
    });

    container.addProvider({
      provide: MockValueInjector,
      value: 'test',
    });

    const inject = container.inject(MockInjectClass);
    expect(inject.root).toStrictEqual(container);
  });

  it('should inject parent container', () => {
    const container = new Container();

    container.addProvider({
      provide: RootContainerToken,
      value: container,
    });

    container.addProvider({
      provide: MockValueInjector,
      value: 'test',
    });

    const subContainer = new Container({
      parent: container,
    });

    subContainer.addProvider({
      provide: MockInjectClass,
      class: MockInjectClass,
    });

    subContainer.addProvider({
      provide: MockValueInjector,
      value: 'test',
    });

    const inject = subContainer.inject(MockInjectClass);
    expect(inject.parent).toStrictEqual(subContainer);
    expect(inject.root).toStrictEqual(container);
  });

  it('should inject value', () => {
    const container = new Container();

    container.addProvider({
      provide: RootContainerToken,
      value: container,
    });

    container.addProvider({
      provide: MockValueInjector,
      value: 'test',
    });

    container.addProvider({
      provide: MockInjectClass,
      class: MockInjectClass,
    });

    const inject = container.inject(MockInjectClass);
    expect(inject.inject).toBe('test');
  });
});
