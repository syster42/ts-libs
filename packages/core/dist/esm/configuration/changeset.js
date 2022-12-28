export class ChangeSet {
    path;
    value;
    type;
    constructor(path, value, type) {
        this.path = path;
        this.value = value;
        this.type = type;
    }
}
export default ChangeSet;
