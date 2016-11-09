import { Record } from '../record';

export declare class StreamObserver {
    /**
     * @constructor
     */
    constructor();

    /**
     * Will be called on every record that comes in and transform a raw record
     * to a Object. If user-provided observer is present, pass transformed record
     * to it's onNext method, otherwise, push to record que.
     * @param {Array} rawRecord - An array with the raw record
     */
    onNext(rawRecord: Record): void;

    onCompleted(meta: any): void;

    /**
     * Will be called on errors.
     * If user-provided observer is present, pass the error
     * to it's onError method, otherwise set instance variable _error.
     * @param {Object} error - An error object
     */
    onError(error: Error): void;
}