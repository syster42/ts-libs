import ChangeSetType from '../enums/changeset-type.js';

export class ChangeSet {
  public readonly path: string;

  public readonly value: any;

  public readonly type: ChangeSetType;

  constructor(path: string, value: any, type: ChangeSetType) {
    this.path = path;
    this.value = value;
    this.type = type;
  }
}

export default ChangeSet;
