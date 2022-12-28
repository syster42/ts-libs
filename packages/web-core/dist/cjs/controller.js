"use strict";
/* eslint-disable no-underscore-dangle */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const http = __importStar(require("http"));
const koa_router_1 = __importDefault(require("koa-router"));
const middleware_call_js_1 = __importDefault(require("./symbols/middleware-call.js"));
/**
 * Controller class
 */
class Controller {
    constructor() {
        this.__routeTable = new Map();
        this.annotateHttpMethods();
        this.createRouteTable();
        this._router = new koa_router_1.default({
            prefix: this.__prefix(),
        });
        this.allowedMethods().forEach((method) => {
            const routes = this.__routeTable.get(method);
            routes === null || routes === void 0 ? void 0 : routes.forEach((route) => {
                this.router[method](route.route, async (ctx, next) => this.dispatch(ctx, next));
            });
        });
    }
    /**
     * Returns the router for the controller
     * @returns {Router}
     */
    get router() {
        return this._router;
    }
    /**
     * Returns the prefix for the controller
     * @returns {string}
     */
    // eslint-disable-next-line class-methods-use-this
    __prefix() {
        return '';
    }
    /**
     * Returns the allowed methods for the controller
     * @returns {string[]}
     */
    allowedMethods() {
        return Array.from(this.__routeTable.keys());
    }
    /**
     * Sets allowed methods to the Context
     * @param {Application.Context} ctx
     */
    options(ctx) {
        ctx.response.set('Allow', this.allowedMethods());
    }
    /**
     * Dispatches the called method
     * @param {Application.Context} ctx
     * @param {Application.Next} next
     * @returns {Promise<void>}
     */
    async [middleware_call_js_1.default](ctx, next) {
        return this.dispatch(ctx, next);
    }
    /**
     * Dispatches the called method
     * @param {Application.Context} ctx
     * @param {Application.Next} next
     * @returns {Promise<void>}
     */
    async dispatch(ctx, next) {
        const { method } = ctx.request;
        if (!http.METHODS.includes(method)) {
            return ctx.throw(501, `${method} is not implemented`);
        }
        if (!this.__routeTable.has(method.toLowerCase())) {
            return ctx.throw(405, `${method} is not allowed`, this.allowedMethods());
        }
        const routes = this.__routeTable.get(method.toLowerCase());
        const route = routes[0];
        const acceptsMimeTypes = Array.from(route.accepts.keys());
        const acceptsResult = ctx.accepts(...acceptsMimeTypes);
        /* istanbul ignore next */
        if (!acceptsResult || !route.accepts.has(acceptsResult)) {
            /* istanbul ignore next */
            if (!route.default) {
                return ctx.throw(406, `MimeType is not supported, only the following are supported: ${acceptsMimeTypes.join(', ')}`);
            }
            return this[route.default](ctx, next);
        }
        /* istanbul ignore next */
        return this[route.accepts.get(acceptsResult)](ctx, next);
    }
    /**
     * Annotates the controller methods
     * @private
     */
    annotateHttpMethods() {
        var _a;
        if (!this.__annotations) {
            this.__annotations = (_a = this.constructor.prototype.__annotations) !== null && _a !== void 0 ? _a : new Map();
        }
        http.METHODS.map((m) => m.toLowerCase()).forEach((method) => {
            if (typeof this[method] === 'function') {
                if (!this.__annotations.has(method)) {
                    this.__annotations.set(method, [
                        {
                            name: 'httpMethod',
                            args: [method],
                        },
                    ]);
                }
                else {
                    let hasAnnotation = false;
                    this.__annotations.get(method).forEach((annotation) => {
                        if (annotation.name === 'httpMethod') {
                            hasAnnotation = true;
                        }
                    });
                    if (!hasAnnotation) {
                        this.__annotations.get(method).push({
                            name: 'httpMethod',
                            args: [method],
                        });
                    }
                }
            }
        });
    }
    /**
     * Creates the route table
     * @private
     */
    createRouteTable() {
        this.__annotations.forEach((annotations, controllerMethod) => {
            annotations.push({
                name: 'method',
                args: [controllerMethod],
            });
            if (annotations.findIndex((a) => a.name === 'route') === -1) {
                annotations.push({
                    name: 'route',
                    args: ['/'],
                });
            }
            const tmp = {
                accepts: new Map(),
                httpMethod: '',
                method: '',
                route: '',
                default: '',
            };
            annotations.forEach((a) => {
                if (a.name !== 'accepts') {
                    [tmp[a.name]] = a.args;
                }
                else if (a.args.length > 0) {
                    a.args.forEach((mime) => {
                        if (mime === '*') {
                            tmp.default = controllerMethod;
                        }
                        else {
                            tmp.accepts.set(mime, controllerMethod);
                        }
                    });
                }
            });
            if (tmp.accepts.size === 0) {
                tmp.default = controllerMethod;
            }
            if (this.__routeTable.get(tmp.httpMethod) === undefined) {
                this.__routeTable.set(tmp.httpMethod, []);
            }
            const current = this.__routeTable.get(tmp.httpMethod);
            current === null || current === void 0 ? void 0 : current.push(tmp);
            this.__routeTable.set(tmp.httpMethod, current);
        });
    }
}
exports.Controller = Controller;
exports.default = Controller;
