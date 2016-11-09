import { ResultSummary } from './result-summary';
import { StreamObserver } from './internal/stream-observer';

/**
  * A stream of {@link Record} representing the result of a statement.
  * @access public
  */
export declare  class Result {
    /**
     * Inject the observer to be used.
     * @constructor
     * @access private
     * @param {StreamObserver} streamObserver
     * @param {mixed} statement - Cypher statement to execute
     * @param {Object} parameters - Map with parameters to use in statement
     */
    constructor(streamObserver: StreamObserver, statement: string|any, parameters: any);

    /**
     * Create and return new Promise
     * @return {Promise} new Promise.
     * @access private
     */
    _createPromise(): Promise<any>;

    /**
     * Waits for all results and calls the passed in function with the results.
     * Cannot be combined with the {@link #subscribe} function.
     *
     * @param {function(result: {records:Array<Record>})} onFulfilled - Function to be called when finished.
     * @param {function(error: {message:string, code:string})} onRejected - Function to be called upon errors.
     * @return {Promise} promise.
     */


}