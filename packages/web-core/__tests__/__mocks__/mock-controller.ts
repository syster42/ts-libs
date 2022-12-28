import { type Context } from 'koa';
import { accepts, controller, Controller, method, route } from '../../src/index.js';

@controller('/test')
export class MockController extends Controller {
  // eslint-disable-next-line class-methods-use-this
  @accepts('*')
  public async get(ctx: Context): Promise<void> {
    ctx.response.body = 'get';
  }

  // eslint-disable-next-line class-methods-use-this
  @method('PUT')
  public async test(ctx: Context): Promise<void> {
    ctx.response.body = 'test';
  }

  // eslint-disable-next-line class-methods-use-this
  @method('POST')
  @route('route')
  public async test2(ctx: Context): Promise<void> {
    ctx.response.body = 'test2';
  }

  // eslint-disable-next-line class-methods-use-this
  @accepts('application/json')
  public async patch(ctx: Context): Promise<void> {
    ctx.response.body = 'patch';
  }
}

export default MockController;
