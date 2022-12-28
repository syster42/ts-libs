"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseThrottle = void 0;
class PromiseThrottle {
    constructor(max) {
        this.max = max;
        this.current = 0;
        this.queue = [];
    }
    async run(fn) {
        return new Promise((res, rej) => {
            const handle = () => {
                if (this.current < this.max) {
                    this.current++;
                    fn()
                        .then((val) => {
                        var _a;
                        res(val);
                        this.current--;
                        if (this.queue.length > 0) {
                            (_a = this.queue.shift()) === null || _a === void 0 ? void 0 : _a();
                        }
                    })
                        .catch(
                    /* istanbul ignore next */
                    (err) => {
                        var _a;
                        rej(err);
                        this.current--;
                        if (this.queue.length > 0) {
                            (_a = this.queue.shift()) === null || _a === void 0 ? void 0 : _a();
                        }
                    });
                }
                else {
                    this.queue.push(handle);
                }
            };
            handle();
        });
    }
}
exports.PromiseThrottle = PromiseThrottle;
exports.default = PromiseThrottle;
