/* istanbul ignore file */
// FIXME write tests

import { Container, Ctor, Logger } from '@syster42/core';

/**
 * injects all files in a folder to a container
 * @param {string} path
 * @param {Container} container
 * @param {Logger} logger
 * @returns {Promise<T[]>}
 */
export const injectFolder = async <T>(path: string, container: Container, logger: Logger): Promise<T[]> => {
  try {
    const controllers: { [x: string]: Ctor<T> } = await import(path);
    const instances: T[] = [];
    Object.keys(controllers).forEach((c) => {
      const ctrl = controllers[c];
      logger.info(`Injecting file with DI: ${c}.`);
      const provider = container
        .addProvider({
          provide: ctrl,
          class: ctrl,
        })
        .getProvider<T>(ctrl);
      if (provider && provider.scopedValue) {
        container.inject(ctrl);
        instances.push(provider.scopedValue);
      }
    });
    return instances;
  } catch (e) {
    logger.error('Error injecting folders', e);
    throw e;
  }
};

export default injectFolder;
