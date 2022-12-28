import { Controller, middlewareCall } from '../src/index.js';
import MockController from './__mocks__/mock-controller.js';

describe('controller', () => {
  it('should be defined', () => {
    expect(Controller).toBeDefined();
  });

  it('should set allow to options', () => {
    const ctrl = new Controller();
    const ctx = {
      response: new Map(),
    };
    ctrl.options(ctx as any);
    expect(ctx.response.get('Allow').join()).toBe(ctrl.allowedMethods().join());
  });

  it('should have default prefix', () => {
    const ctrl = new Controller();
    // eslint-disable-next-line no-underscore-dangle
    expect(ctrl.__prefix()).toBe('');
  });

  it('should dispatch', async () => {
    const ctrl = new MockController();
    const ctx = {
      request: {
        method: 'GET',
      },
      throw: jest.fn(),
      accepts: jest.fn(),
      response: {
        body: null,
      },
    };
    await ctrl[middlewareCall](ctx as any, jest.fn());
    expect(ctx.response.body).toBe('get');
  });

  it('should throw if invalid method', async () => {
    const ctrl = new MockController();
    let thrown = false;
    const ctx = {
      request: {
        method: 'invalid',
      },
      throw: (): void => {
        thrown = true;
      },
      accepts: jest.fn(),
      response: {
        body: null,
      },
    };
    await ctrl[middlewareCall](ctx as any, jest.fn());
    expect(thrown).toBe(true);
  });

  it('should throw if invalid route', async () => {
    const ctrl = new MockController();
    let thrown = false;
    const ctx = {
      request: {
        method: 'DELETE',
      },
      throw: (): void => {
        thrown = true;
      },
      accepts: jest.fn(),
      response: {
        body: null,
      },
    };
    await ctrl[middlewareCall](ctx as any, jest.fn());
    expect(thrown).toBe(true);
  });
});
