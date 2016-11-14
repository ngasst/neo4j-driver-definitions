import { ResultSummary } from './result-summary';
import { StreamObserver } from './internal/stream-observer';
import { Promise } from 'es6-promise';

/**
  * A stream of {@link Record} representing the result of a statement.
  * @access public
  */
export declare  class Result {
  _streamObserver: StreamObserver;
  _p: any;
  _statement: any;
  _parameters: any;
  _metaSupplier: () => any;
    /**
     * Inject the observer to be used.
     * @constructors
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
    protected _createPromise(): Promise<any>;

    /**
     * Waits for all results and calls the passed in function with the results.
     * Cannot be combined with the {@link #subscribe} function.
     *
     * @param {function(result: {records:Array<Record>})} onFulfilled - Function to be called when finished.
     * @param {function(error: {message:string, code:string})} onRejected - Function to be called upon errors.
     * @return {Promise} promise.
     */
    then(onFulfilled: (result: Result) => void, onRejected: (error: Error) => void): Promise<any>;

    /**
     * Catch errors when using promises.
     * Cannot be used with the subscribe function.
     * @param {function(error: {message:string, code:string})} onRejected - Function to be called upon errors.
     * @return {Promise} promise.
     */
    catch(onRejected: (error: Error) => void): Promise<any>;

    /**
     * Stream records to observer as they come in, this is a more efficient method
     * of handling the results, and allows you to handle arbitrarily large results.
     *
     * @param {Object} observer - Observer object
     * @param {function(record: Record)} observer.onNext - Handle records, one by one.
     * @param {function(metadata: Object)} observer.onCompleted - Handle stream tail, the metadata.
     * @param {function(error: {message:string, code:string})} observer.onError - Handle errors.
     * @return
     */
		
    subscribe(observer: Observer): Subscription
}