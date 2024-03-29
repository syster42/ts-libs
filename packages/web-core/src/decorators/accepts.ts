import annotate from './annotate.js';

/**
 * Decorator to set accepted mime types for a method.
 * @param {string} mimeType
 * @returns {any}
 */
export const accepts = (mimeType: string): any => annotate('accepts', mimeType.toLowerCase());
export default accepts;
