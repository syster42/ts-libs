"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
/**
 * Routes middleware, puts all routes in the response body
 * @param {IRoutesSettings} settings
 * @returns {Router.IMiddleware}
 */
const routes = (settings) => (ctx, next) => {
    const tmp = {};
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
exports.routes = routes;
exports.default = exports.routes;
