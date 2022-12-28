import Ctor from '../../types/ctor.js';
import Config from '../config.js';
/**
 * builds internal config path
 *
 * @param {*} cfg
 * @param {string} [currentPath='']
 * @param {string[]} [out=[]]
 * @return {*}  {string[]}
 */
export declare const buildPath: (cfg: any, currentPath?: string, out?: string[]) => string[];
/**
 * apply config data to the given configuration class
 *
 * @template T
 * @param {Ctor<T>} ConfigurationClass
 * @param {Config} configRoot
 */
export declare const configure: <T>(ConfigurationClass: Ctor<T>, configRoot: Config) => void;
export default configure;
//# sourceMappingURL=configure.d.ts.map