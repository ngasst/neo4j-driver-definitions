export declare class Pool {
    /**
     * @param create  an allocation function that creates a new resource. It's given
     *                a single argument, a function that will return the resource to
     *                the pool if invoked, which is meant to be called on .dispose
     *                or .close or whatever mechanism the resource uses to finalize.
     * @param destroy called with the resource when it is evicted from this pool
     * @param validate called at various times (like when an instance is acquired and
     *                 when it is returned). If this returns false, the resource will
     *                 be evicted
     * @param maxIdle the max number of resources that are allowed idle in the pool at
     *                any time. If this threshold is exceeded, resources will be evicted.
     */
    constructor(create: (arg: any) => any, destory: () => boolean, validate: () => boolean, maxIdle: number);

    acquire(key: string): any;

    purge(key: string): void;

    purgeAll():void;

    has(key: string): boolean;

    _release(key: string, resource: any): void;
}