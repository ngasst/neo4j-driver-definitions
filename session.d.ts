import { StreamObserver } from './internal/stream-observer';
import { Result } from './result';
import { Transaction } from './transaction';
import { newError } from './error';

export declare class Session {
    /**
     * @constructor
     * @param {Connection} conn - A connection to use
     * @param {function()} onClose - Function to be called on connection close
     */
    constructor(conn: any, onClose: () => void);

    /**
     * Run Cypher statement
     * Could be called with a statement object i.e.: {statement: "MATCH ...", parameters: {param: 1}}
     * or with the statement and parameters as separate arguments.
     * @param {mixed} statement - Cypher statement to execute
     * @param {Object} parameters - Map with parameters to use in statement
     * @return {Result} - New Result
     */
    run(statement: string|any, parameters?: any): Result;

    /**
     * Begin a new transaction in this session. A session can have at most one transaction running at a time, if you
     * want to run multiple concurrent transactions, you should use multiple concurrent sessions.
     *
     * While a transaction is open the session cannot be used to run statements outside the transaction.
     *
     * @returns {Transaction} - New Transaction
     */
    beginTransaction(): Transaction;

    /**
     * Close this session.
     * @param {function()} cb - Function to be called after the session has been closed
     * @return
     */
    close(cb: () => null|void);
}