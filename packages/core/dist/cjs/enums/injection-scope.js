"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionScope = void 0;
/**
 * Enum to describe the scope of the injection
 *
 * @enum {number}
 */
var InjectionScope;
(function (InjectionScope) {
    InjectionScope[InjectionScope["NONE"] = 0] = "NONE";
    InjectionScope[InjectionScope["SINGLETON"] = 1] = "SINGLETON";
    InjectionScope[InjectionScope["HOSTED"] = 2] = "HOSTED";
    InjectionScope[InjectionScope["TRANSIENT"] = 3] = "TRANSIENT";
})(InjectionScope = exports.InjectionScope || (exports.InjectionScope = {}));
exports.default = InjectionScope;
