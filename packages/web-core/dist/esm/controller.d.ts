import { Context, Next } from 'koa';
import Router from 'koa-router';
import middlewareCall from './symbols/middleware-call.js';
import MethodAnnotation from './types/method-annotation.js';
import RouteTable from './types/route-table.js';
/**
 * Controller class
 */
export declare class Controller {
    [x: string]: any;
    __annotations: Map<string, MethodAnnotation[]>;
    readonly __routeTable: RouteTable;
    private readonly _router;
    constructor();
    /**
     * Returns the router for the controller
     * @returns {Router}
     */
    get router(): Router;
    /**
     * Returns the prefix for the controller
     * @returns {string}
     */
    __prefix(): string;
    /**
     * Returns the allowed methods for the controller
     * @returns {string[]}
     */
    allowedMethods(): string[];
    /**
     * Sets allowed methods to the Context
     * @param {Application.Context} ctx
     */
    options(ctx: Context): void;
    /**
     * Dispatches the called method
     * @param {Application.Context} ctx
     * @param {Application.Next} next
     * @returns {Promise<void>}
     */
    [middlewareCall](ctx: Context, next: Next): Promise<void>;
    /**
     * Dispatches the called method
     * @param {Application.Context} ctx
     * @param {Application.Next} next
     * @returns {Promise<void>}
     */
    dispatch(ctx: Context, next: Next): Promise<void>;
    /**
     * Annotates the controller methods
     * @private
     */
    private annotateHttpMethods;
    /**
     * Creates the route table
     * @private
     */
    private createRouteTable;
}
export default Controller;
//# sourceMappingURL=controller.d.ts.map