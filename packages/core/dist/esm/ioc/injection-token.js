/**
 * injection token class
 * used to identify a token
 *
 * @class InjectionToken
 */
export class InjectionToken {
    /**
     * id of the token
     *
     * @type {string}
     * @memberof InjectionToken
     */
    id;
    /**
     * Creates an instance of InjectionToken.
     * @param {string} id
     * @memberof InjectionToken
     */
    constructor(id) {
        this.id = id;
    }
}
export default InjectionToken;
