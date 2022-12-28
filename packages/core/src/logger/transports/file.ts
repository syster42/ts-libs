// FIXME add tests
/* istanbul ignore file */

import { createWriteStream, WriteStream } from 'fs';
import { inspect } from 'util';
import LogLevel from '../../enums/log-level.js';
import IFileConfig from '../../interfaces/file-config.js';
import Transport from '../transport.js';
import createTemplate from '../util/create-template.js';
import format from '../util/format.js';

/**
 * default config for file transport
 *  @type {*}
 */
const defaultConfig: Partial<IFileConfig> = {
  level: LogLevel.INFORMATION,
  template: createTemplate(format.date(), format.level(), format.location(), format.text(': '), format.message()),
};

/**
 * file transport class
 *
 * @class File
 * @extends {Transport}
 */
export class File extends Transport {
  /**
   * file write stream
   *
   * @private
   * @type {WriteStream}
   * @memberof File
   */
  private fileStream: WriteStream;

  /**
   * Creates an instance of File.
   * @param {IFileConfig} config
   * @memberof File
   */
  constructor(config: IFileConfig) {
    const cfg = { ...defaultConfig, ...config };
    super(cfg);

    this.fileStream = createWriteStream(cfg.path);
  }

  /**
   *
   * formats a string with inspect
   * @param {*} value
   * @return {*}  {string}
   * @memberof File
   */
  // eslint-disable-next-line class-methods-use-this
  public format(value: any): string {
    if (value !== null && typeof value === 'object') {
      return `, ${inspect(value, false, 2, true)}`;
    }

    return `, ${value}`;
  }

  /**
   * logs a message to file
   *
   * @param {{ message: string, level: LogLevel }} { message }
   * @memberof File
   */
  public log({ message }: { message: string; level: LogLevel }): void {
    this.fileStream.write(`${message}\n`);
  }
}

export default File;
