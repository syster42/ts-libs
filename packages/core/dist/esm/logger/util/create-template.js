/**
 * create template for logging
 *
 * @param {...((info: IInfo) => string)[]} funcs
 */
// eslint-disable-next-line max-len
export const createTemplate = (...funcs) => (info) => funcs.reduce((prev, curr) => `${prev}${curr(info)}`, '');
export default createTemplate;
