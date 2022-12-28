/**
 * Enum for log levels
 *
 * @enum {number}
 */
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["CRITICAL"] = 0] = "CRITICAL";
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
    LogLevel[LogLevel["INFORMATION"] = 3] = "INFORMATION";
    LogLevel[LogLevel["DEBUG"] = 4] = "DEBUG";
    LogLevel[LogLevel["TRACE"] = 5] = "TRACE";
})(LogLevel = LogLevel || (LogLevel = {}));
export default LogLevel;
