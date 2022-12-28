export class PromiseThrottle {
    max;
    current;
    queue;
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
                        res(val);
                        this.current--;
                        if (this.queue.length > 0) {
                            this.queue.shift()?.();
                        }
                    })
                        .catch(
                    /* istanbul ignore next */
                    (err) => {
                        rej(err);
                        this.current--;
                        if (this.queue.length > 0) {
                            this.queue.shift()?.();
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
export default PromiseThrottle;
