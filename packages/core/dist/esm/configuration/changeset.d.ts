import ChangeSetType from '../enums/changeset-type.js';
export declare class ChangeSet {
    readonly path: string;
    readonly value: any;
    readonly type: ChangeSetType;
    constructor(path: string, value: any, type: ChangeSetType);
}
export default ChangeSet;
//# sourceMappingURL=changeset.d.ts.map