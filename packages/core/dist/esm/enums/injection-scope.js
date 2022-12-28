/**
 * Enum to describe the scope of the injection
 *
 * @enum {number}
 */
export var InjectionScope;
(function (InjectionScope) {
    InjectionScope[InjectionScope["NONE"] = 0] = "NONE";
    InjectionScope[InjectionScope["SINGLETON"] = 1] = "SINGLETON";
    InjectionScope[InjectionScope["HOSTED"] = 2] = "HOSTED";
    InjectionScope[InjectionScope["TRANSIENT"] = 3] = "TRANSIENT";
})(InjectionScope = InjectionScope || (InjectionScope = {}));
export default InjectionScope;
