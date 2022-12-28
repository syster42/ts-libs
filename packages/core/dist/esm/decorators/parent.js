import 'reflect-metadata';
import ParentContainerToken from '../ioc/tokens/parent-container.js';
import Inject from './inject.js';
/**
 * injects the parent container
 */
export const Parent = () => Inject(ParentContainerToken);
export default Parent;
