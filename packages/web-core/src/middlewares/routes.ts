import { Next } from 'koa';
import Router from 'koa-router';
import IRoutesSettings from '../interfaces/route-settings.js';

/**
 * Routes middleware, puts all routes in the response body
 * @param {IRoutesSettings} settings
 * @returns {Router.IMiddleware}
 */
export const routes =
  (settings: IRoutesSettings): Router.IMiddleware =>
  (ctx: any, next: Next) => {
    const tmp: { [x: string]: any } = {};
    settings.router.stack.forEach((r) => {
      if (!tmp[r.path]) {
        tmp[r.path] = {};
        tmp[r.path].methods = [];
      }
      tmp[r.path].methods = tmp[r.path].methods.concat(r.methods);
    });

    ctx.body = Object.keys(tmp).map((k) => ({
      [k]: tmp[k].methods.join(', '),
    }));
    ctx.status = 200;
    return next();
  };

export default routes;
