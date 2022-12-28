import IInfo from '../../interfaces/info.js';
/**
 * create template for logging
 *
 * @param {...((info: IInfo) => string)[]} funcs
 */
export declare const createTemplate: (...funcs: ((info: IInfo) => string)[]) => (info: IInfo) => any;
export default createTemplate;
//# sourceMappingURL=create-template.d.ts.map