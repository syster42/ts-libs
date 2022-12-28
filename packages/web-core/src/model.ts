import { IModel } from './interfaces/model.js';

export abstract class Model implements IModel {
  public static deserialize(_data: any): Model {
    throw new Error('deserialize is not implemented');
  }

  public abstract serialize(): any;
}

export default Model;
