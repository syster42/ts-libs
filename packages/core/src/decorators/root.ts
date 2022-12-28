import 'reflect-metadata';
import RootContainerToken from '../ioc/tokens/root-container.js';
import Inject from './inject.js';

/**
 * injects the root container
 */
export const Root = (): any => Inject(RootContainerToken);

export default Root;
