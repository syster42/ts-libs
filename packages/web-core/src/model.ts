import { IModel } from './interfaces/model.js';

export abstract class Model implements IModel {
  public static deserialize<T extends Partial<Model>>(_data: any): T {
    throw new Error('deserialize is not implemented');
  }

  public abstract serialize<T = any>(): T;
}

export default Model;
