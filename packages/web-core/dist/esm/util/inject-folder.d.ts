import { Container, Logger } from '@syster42/core';
/**
 * injects all files in a folder to a container
 * @param {string} path
 * @param {Container} container
 * @param {Logger} logger
 * @returns {Promise<T[]>}
 */
export declare const injectFolder: <T>(path: string, container: Container, logger: Logger) => Promise<T[]>;
export default injectFolder;
//# sourceMappingURL=inject-folder.d.ts.map