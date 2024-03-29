import Ctor from '../../types/ctor.js';
import Config from '../config.js';
import { isPrimitive } from './is-primitive.js';

/**
 * casts a primitive value to a typeof target
 *
 * @param {*} target
 * @param {*} value
 * @return {*}  {*}
 */
const cast = (target: any, value: any): any => {
  let val = value;
  if (val === undefined) {
    return target;
  }
  if (isPrimitive(target)) {
    if (typeof target !== typeof val) {
      switch (typeof target) {
        case 'string':
          val = `${val}`;
          break;
        case 'number':
          val = Number(val);
          break;
        case 'boolean': {
          if (typeof val === 'string') {
            val = val.toLowerCase() === 'true' || val.toLowerCase() === '1';
          } else if (typeof val === 'number') {
            val = val === 1;
          }
          val = !!val;
          break;
        }
        /* istanbul ignore next */
        default:
          break;
      }
    }
  }
  return val;
};

/**
 * builds internal config path
 *
 * @param {*} cfg
 * @param {string} [currentPath='']
 * @param {string[]} [out=[]]
 * @return {*}  {string[]}
 */
export const buildPath = (cfg: any, currentPath = '', out: string[] = []): string[] => {
  let names = Object.getOwnPropertyNames(cfg);
  if (Array.isArray(cfg)) {
    names = names.filter((n) => n !== 'length');
  }
  if (cfg && names.length > 0) {
    names.forEach((name) => {
      if (!Array.isArray(cfg)) {
        if (typeof cfg !== 'string') {
          out.concat(buildPath(cfg[name], `${currentPath}/${name}`, out));
        } else if (!out.includes(currentPath)) {
          out.push(currentPath);
        }
      } else {
        out.push(currentPath);
      }
    });
  } else {
    out.push(currentPath);
  }

  return out;
};

/**
 * apply config data to the given configuration class
 *
 * @template T
 * @param {Ctor<T>} ConfigurationClass
 * @param {Config} configRoot
 */
export const configure = <T>(ConfigurationClass: Ctor<T>, configRoot: Config): void => {
  const cfg = new ConfigurationClass();
  const paths = buildPath(cfg).map((p) => p.split('/').slice(1));

  const config = configRoot;
  config[ConfigurationClass.name] = cfg;

  const current = config[ConfigurationClass.name];
  paths.forEach((path) => {
    path.reduce((prev, cur, idx, arr) => {
      if (prev && prev[cur] !== null && prev[cur] !== undefined) {
        if (idx === arr.length - 1) {
          // eslint-disable-next-line no-param-reassign
          prev[cur] = cast(prev[cur], config.get(`/${path.join('/')}`));
        }
        return prev[cur];
      }
      /* istanbul ignore next */
      return null;
    }, current);
  });
};

export default configure;
