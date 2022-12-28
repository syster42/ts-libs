export class PromiseThrottle {
  private current: number;

  private queue: (() => void)[];

  constructor(private max: number) {
    this.current = 0;
    this.queue = [];
  }

  public async run<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((res, rej) => {
      const handle = (): void => {
        if (this.current < this.max) {
          this.current++;
          fn()
            .then((val: T) => {
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
              },
            );
        } else {
          this.queue.push(handle);
        }
      };
      handle();
    });
  }
}

export default PromiseThrottle;
