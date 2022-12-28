/* eslint-disable no-underscore-dangle */

import 'reflect-metadata';

/**
 * Annotates a class with a property.
 * @param {string} annotationName
 * @param args
 * @returns {(target: any, propertyKey: string) => void}
 */
export const annotate =
  (annotationName: string, ...args: any[]) =>
  (target: any, propertyKey: string): void => {
    if (!target.__annotations) {
      // eslint-disable-next-line no-param-reassign
      target.__annotations = new Map();
    }
    if (!target.__annotations.has(propertyKey)) {
      target.__annotations.set(propertyKey, []);
    }

    target.__annotations.get(propertyKey)!.push({
      name: annotationName,
      args,
    });
  };

export default annotate;
