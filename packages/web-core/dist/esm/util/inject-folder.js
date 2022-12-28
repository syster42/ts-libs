/* istanbul ignore file */
// FIXME write tests
/**
 * injects all files in a folder to a container
 * @param {string} path
 * @param {Container} container
 * @param {Logger} logger
 * @returns {Promise<T[]>}
 */
export const injectFolder = async (path, container, logger) => {
    try {
        const controllers = await import(path);
        const instances = [];
        Object.keys(controllers).forEach((c) => {
            const ctrl = controllers[c];
            logger.info(`Injecting file with DI: ${c}.`);
            const provider = container
                .addProvider({
                provide: ctrl,
                class: ctrl,
            })
                .getProvider(ctrl);
            if (provider && provider.scopedValue) {
                container.inject(ctrl);
                instances.push(provider.scopedValue);
            }
        });
        return instances;
    }
    catch (e) {
        logger.error('Error injecting folders', e);
        throw e;
    }
};
export default injectFolder;
