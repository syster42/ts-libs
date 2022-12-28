/**
 * Enum to describe the scope of the injection
 *
 * @enum {number}
 */
export enum InjectionScope {
  NONE = 0,
  SINGLETON = 1,
  HOSTED = 2,
  TRANSIENT = 3,
}

export default InjectionScope;
