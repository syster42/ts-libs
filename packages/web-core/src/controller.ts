/* eslint-disable no-underscore-dangle */

import * as http from 'http';
import { Context, Next } from 'koa';
import Router from 'koa-router';
import middlewareCall from './symbols/middleware-call.js';
import MethodAnnotation from './types/method-annotation.js';
import MethodRoutes from './types/method-routes.js';
import RouteTable from './types/route-table.js';

/**
 * Controller class
 */
export class Controller {
  [x: string]: any;

  public __annotations!: Map<string, MethodAnnotation[]>;

  public readonly __routeTable: RouteTable;

  private readonly _router: Router;

  constructor() {
    this.__routeTable = new Map();
    this.annotateHttpMethods();
    this.createRouteTable();

    this._router = new Router({
      prefix: this.__prefix(),
    });

    this.allowedMethods().forEach((method: string) => {
      const routes = this.__routeTable.get(method);
      routes?.forEach((route) => {
        (this.router as any)[method](route.route, async (ctx: Context, next: Next) => this.dispatch(ctx, next));
      });
    });
  }

  /**
   * Returns the router for the controller
   * @returns {Router}
   */
  public get router(): Router {
    return this._router;
  }

  /**
   * Returns the prefix for the controller
   * @returns {string}
   */
  // eslint-disable-next-line class-methods-use-this
  public __prefix(): string {
    return '';
  }

  /**
   * Returns the allowed methods for the controller
   * @returns {string[]}
   */
  public allowedMethods(): string[] {
    return Array.from(this.__routeTable.keys());
  }

  /**
   * Sets allowed methods to the Context
   * @param {Application.Context} ctx
   */
  public options(ctx: Context): void {
    ctx.response.set('Allow', this.allowedMethods());
  }

  /**
   * Dispatches the called method
   * @param {Application.Context} ctx
   * @param {Application.Next} next
   * @returns {Promise<void>}
   */
  public async [middlewareCall](ctx: Context, next: Next): Promise<void> {
    return this.dispatch(ctx, next);
  }

  /**
   * Dispatches the called method
   * @param {Application.Context} ctx
   * @param {Application.Next} next
   * @returns {Promise<void>}
   */
  public async dispatch(ctx: Context, next: Next): Promise<void> {
    const { method } = ctx.request;
    if (!http.METHODS.includes(method)) {
      return ctx.throw(501, `${method} is not implemented`);
    }

    if (!this.__routeTable.has(method.toLowerCase())) {
      return ctx.throw(405, `${method} is not allowed`, this.allowedMethods());
    }

    const routes = this.__routeTable.get(method.toLowerCase())!;
    const route = routes[0];
    const acceptsMimeTypes = Array.from(route.accepts.keys());
    const acceptsResult = ctx.accepts(...acceptsMimeTypes);
    /* istanbul ignore next */
    if (!acceptsResult || !route.accepts.has(acceptsResult as string)) {
      /* istanbul ignore next */
      if (!route.default) {
        return ctx.throw(406, `MimeType is not supported, only the following are supported: ${acceptsMimeTypes.join(', ')}`);
      }
      return this[route.default](ctx, next);
    }
    /* istanbul ignore next */
    return this[route.accepts.get(acceptsResult as string)!](ctx, next);
  }

  /**
   * Annotates the controller methods
   * @private
   */
  private annotateHttpMethods(): void {
    if (!this.__annotations) {
      this.__annotations = this.constructor.prototype.__annotations ?? new Map();
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
        } else {
          let hasAnnotation = false;
          this.__annotations.get(method)!.forEach((annotation) => {
            if (annotation.name === 'httpMethod') {
              hasAnnotation = true;
            }
          });
          if (!hasAnnotation) {
            this.__annotations.get(method)!.push({
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
  private createRouteTable(): void {
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
      const tmp: MethodRoutes = {
        accepts: new Map(),
        httpMethod: '',
        method: '',
        route: '',
        default: '',
      };
      annotations.forEach((a) => {
        if (a.name !== 'accepts') {
          [tmp[a.name]] = a.args;
        } else if (a.args.length > 0) {
          a.args.forEach((mime) => {
            if (mime === '*') {
              tmp.default = controllerMethod;
            } else {
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
      current?.push(tmp);
      this.__routeTable.set(tmp.httpMethod, current!);
    });
  }
}

export default Controller;
