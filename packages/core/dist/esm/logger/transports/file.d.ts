import LogLevel from '../../enums/log-level.js';
import IFileConfig from '../../interfaces/file-config.js';
import Transport from '../transport.js';
/**
 * file transport class
 *
 * @class File
 * @extends {Transport}
 */
export declare class File extends Transport {
    /**
     * file write stream
     *
     * @private
     * @type {WriteStream}
     * @memberof File
     */
    private fileStream;
    /**
     * Creates an instance of File.
     * @param {IFileConfig} config
     * @memberof File
     */
    constructor(config: IFileConfig);
    /**
     *
     * formats a string with inspect
     * @param {*} value
     * @return {*}  {string}
     * @memberof File
     */
    format(value: any): string;
    /**
     * logs a message to file
     *
     * @param {{ message: string, level: LogLevel }} { message }
     * @memberof File
     */
    log({ message }: {
        message: string;
        level: LogLevel;
    }): void;
}
export default File;
//# sourceMappingURL=file.d.ts.map