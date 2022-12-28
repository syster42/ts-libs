"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionToken = void 0;
/**
 * injection token class
 * used to identify a token
 *
 * @class InjectionToken
 */
class InjectionToken {
    /**
     * Creates an instance of InjectionToken.
     * @param {string} id
     * @memberof InjectionToken
     */
    constructor(id) {
        this.id = id;
    }
}
exports.InjectionToken = InjectionToken;
exports.default = InjectionToken;
