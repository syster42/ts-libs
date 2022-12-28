import 'reflect-metadata';
/**
 * Annotates a class with a property.
 * @param {string} annotationName
 * @param args
 * @returns {(target: any, propertyKey: string) => void}
 */
export declare const annotate: (annotationName: string, ...args: any[]) => (target: any, propertyKey: string) => void;
export default annotate;
//# sourceMappingURL=annotate.d.ts.map