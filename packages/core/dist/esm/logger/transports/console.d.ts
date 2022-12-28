import LogLevel from '../../enums/log-level.js';
import IConsoleConfig from '../../interfaces/console-config.js';
import Transport from '../transport.js';
/**
 * console transport class
 *
 * @class Console
 * @extends {Transport<IConsoleConfig>}
 */
export declare class Console extends Transport<IConsoleConfig> {
    constructor(config: IConsoleConfig);
    /**
     * formats a string with inspect
     *
     * @param {*} value
     * @return {*}  {string}
     * @memberof Console
     */
    format(value: any): string;
    /**
     * logs given message
     *
     * @param {{ message: string, level: LogLevel }} { message, level }
     * @memberof Console
     */
    log({ message, level }: {
        message: string;
        level: LogLevel;
    }): void;
}
export default Console;
//# sourceMappingURL=console.d.ts.map