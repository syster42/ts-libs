import LogLevel from '../enums/log-level.js';
/**
 * log message info interface
 *
 * @export
 * @interface IInfo
 */
export interface IInfo {
    date: Date;
    level: LogLevel;
    location: string;
    message: string;
}
export default IInfo;
//# sourceMappingURL=info.d.ts.map