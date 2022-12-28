import Router from 'koa-router';
import IRoutesSettings from '../interfaces/route-settings.js';
/**
 * Routes middleware, puts all routes in the response body
 * @param {IRoutesSettings} settings
 * @returns {Router.IMiddleware}
 */
export declare const routes: (settings: IRoutesSettings) => Router.IMiddleware;
export default routes;
//# sourceMappingURL=routes.d.ts.map