"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeSet = void 0;
class ChangeSet {
    constructor(path, value, type) {
        this.path = path;
        this.value = value;
        this.type = type;
    }
}
exports.ChangeSet = ChangeSet;
exports.default = ChangeSet;
