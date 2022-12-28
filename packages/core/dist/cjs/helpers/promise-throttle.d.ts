export declare class PromiseThrottle {
    private max;
    private current;
    private queue;
    constructor(max: number);
    run<T>(fn: () => Promise<T>): Promise<T>;
}
export default PromiseThrottle;
//# sourceMappingURL=promise-throttle.d.ts.map