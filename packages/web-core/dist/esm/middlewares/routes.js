/**
 * Routes middleware, puts all routes in the response body
 * @param {IRoutesSettings} settings
 * @returns {Router.IMiddleware}
 */
export const routes = (settings) => (ctx, next) => {
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
export default routes;
