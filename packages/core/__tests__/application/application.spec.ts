import {
  Application,
  Config,
  Logger,
} from '../../src/index.js';
import MockConfigSource from '../__mocks__/mock-config-source.js';
import MockMainService from '../__mocks__/mock-main-service.js';
import MockRuntime from '../__mocks__/mock-runtime.js';

describe('application', () => {
  it('should be defined', () => {
    expect(new Application()).toBeDefined();
  });

  it('should be able to add config sources', () => {
    const app = new Application();
    app.addConfigSource(MockConfigSource);

    const anyApp = app as any;
    expect(anyApp.configSources.size).toBe(1);
    expect(anyApp.configSources.has(MockConfigSource)).toBe(true);
  });

  describe('run', () => {
    const oldEnv = process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC;
    beforeAll(() => {
      // jest.resetModules();
      process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC = '0';
    });

    afterAll(() => {
      process.env.SYSTERBIN_NODE_SYSTEM_MAXPROC = oldEnv;
    });

    it('should be able to run an application', async () => {
      const app = new Application();
      app.addConfigSource(MockConfigSource);
      app.setConfigProvider(Config);

      const anyApp = app as any;

      jest.setTimeout(20000);

      anyApp.runtime = new MockRuntime(anyApp.container);

      anyApp.runtime.cb = async (): Promise<void> => {
        expect(anyApp.runtime.startCalled).toBe(true);
        expect(anyApp.container.getProvider(MockMainService)).toBeDefined();
        expect(anyApp.container.getProvider(MockMainService).provide).toBe(MockMainService);
        expect(anyApp.container.getProvider(MockMainService).scopedValue).toBeDefined();
        expect(anyApp.container.getProvider(MockMainService).scopedValue.startAsyncCalled).toBe(true);

        return Promise.resolve();
      };

      await app.run(MockMainService);
      expect(anyApp.container.getProvider(MockMainService).scopedValue.stopAsyncCalled).toBe(true);
    });

    it('should be able to run an application with a logger', async () => {
      const app = new Application();
      app.addConfigSource(MockConfigSource);

      const anyApp = app as any;

      jest.setTimeout(20000);

      anyApp.runtime = new MockRuntime(anyApp.container);

      anyApp.runtime.cb = async (): Promise<void> => {
        expect(anyApp.runtime.startCalled).toBe(true);
        expect(anyApp.container.getProvider(MockMainService)).toBeDefined();
        expect(anyApp.container.getProvider(MockMainService).provide).toBe(MockMainService);
        expect(anyApp.container.getProvider(MockMainService).scopedValue).toBeDefined();
        expect(anyApp.container.getProvider(MockMainService).scopedValue.startAsyncCalled).toBe(true);

        return Promise.resolve();
      };

      await app.run(MockMainService, new Logger());
      expect(anyApp.container.getProvider(MockMainService).scopedValue.stopAsyncCalled).toBe(true);
    });
  });
});
