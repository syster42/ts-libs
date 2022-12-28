import { IModel } from './interfaces/model.js';
export declare abstract class Model implements IModel {
    static deserialize(_data: any): Model;
    abstract serialize(): any;
}
export default Model;
//# sourceMappingURL=model.d.ts.map