import { routes } from '../src/index.js';
import MockController from './__mocks__/mock-controller.js';

describe('middlewares', () => {
  it('should get routes', async () => {
    const ctrl = new MockController();
    const ctx = {
      status: null,
      body: null,
    };
    routes({
      router: ctrl.router,
    })(ctx as any, jest.fn());
    expect(ctx.status).toBe(200);
  });
});
