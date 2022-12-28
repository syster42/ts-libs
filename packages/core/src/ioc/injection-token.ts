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
  public id: string;

  /**
   * Creates an instance of InjectionToken.
   * @param {string} id
   * @memberof InjectionToken
   */
  constructor(id: string) {
    this.id = id;
  }
}

export default InjectionToken;
