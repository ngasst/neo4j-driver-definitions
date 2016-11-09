import { Result } from './result';
import { StreamObserver } from './internal/stream-observer';
/**
 * Represents a transaction in the Neo4j database.
 *
 * @access public
 */
export declare class Transaction {
    /**
     * @constructor
     * @param {Connection} conn - A connection to use
     * @param {function()} onClose - Function to be called when transaction is committed or rolled back.
     */
    constructor(conn: any, onClose: () => void);

    /**
     * Run Cypher statement
     * Could be called with a statement object i.e.: {statement: "MATCH ...", parameters: {param: 1}}
     * or with the statem ent and parameters as separate arguments.
     * @param {mixed} statement - Cypher statement to execute
     * @param {Object} parameters - Map with parameters to use in statement
     * @return {Result} - New Result
     */
    run(statement: any|string, parameters: any): Result;

    /**
     * Commits the transaction and returns the result.
     *
     * After committing the transaction can no longer be used.
     *
     * @returns {Result} - New Result
     */
    commit(): Result;

    /**
     * Rollbacks the transaction.
     *
     * After rolling back, the transaction can no longer be used.
     *
     * @returns {Result} - New Result
     */
    rollback(): Result;

    _onError(): void;
    
}

/** Internal stream observer used for transactional results*/
declare class _TransactionStreamObserver extends StreamObserver {
    constructor(tx: any);

    onError(error: any|Error): void;
}

declare interface States {
    ACTIVE: State;
    FAILED: State;
    SUCCEDED: State;
    ROLLED_BACK: State;
}

declare interface State {
    commit: (conn: any, observer: _TransactionStreamObserver) => StateResult;
    rollback: (conn: any, observer: _TransactionStreamObserver) => StateResult;
    run: (conn: any, observer: _TransactionStreamObserver, statement: string|any, parameters: any) => StateResult;
}

declare interface StateResult {
    result: Result;
    state: State;
}

declare function _runDiscardAll(msg: string, conn: any, observer: _TransactionStreamObserver): Result;