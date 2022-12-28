import Formatter from '../../types/formatter.js';
/**
 * format logging string
 * @type {*}
 */
export declare const format: {
    date: (_fmt?: string) => Formatter;
    level: () => Formatter;
    location: () => Formatter;
    message: () => Formatter;
    text: (text: string) => Formatter;
    newLine: () => Formatter;
    pid: () => Formatter;
};
export default format;
//# sourceMappingURL=format.d.ts.map