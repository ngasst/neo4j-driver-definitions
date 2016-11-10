import { Session } from './session';
import { Pool } from './internal/pool';
import { Integer } from './integer';
import {connect} from "./internal/connector";
import { Connection } from "./internal/connector";
import { StreamObserver } from './internal/stream-observer';
import {newError, SERVICE_UNAVAILABLE} from "./error";

export declare const READ: string;
export declare const WRITE: string;

/**
 * A driver maintains one or more {@link Session sessions} with a remote
 * Neo4j instance. Through the {@link Session sessions} you can send statements
 * and retrieve results from the database.
 *
 * Drivers are reasonably expensive to create - you should strive to keep one
 * driver instance around per Neo4j Instance you connect to.
 *
 * @access public
 */
export declare class Driver {
  /**
   * You should not be calling this directly, instead use {@link driver}.
   * @constructor
   * @param {string} url
   * @param {string} userAgent
   * @param {Object} token
   * @param {Object} config
   * @access private
   */
  constructor(url: string, userAgent?: string, token?: Object, config?: Object);

  /**
   * Create a new connection instance.
   * @return {Connection} new connector-api session instance, a low level session API.
   * @access private
   */
  _createConnection(url: string, release: (url: string, conn:Connection) => void): Connection;

  /**
   * Check that a connection is usable
   * @return {boolean} true if the connection is open
   * @access private
   **/
  private static _validateConnection(conn: Connection): boolean;

  /**
   * Dispose of a live session, closing any associated resources.
   * @return {Session} new session.
   * @access private
   */
  private _destroyConnection(conn: Connection): Session;

  //Extension point
  _acquireConnection(mode: string): Promise<any>;

  //Extension point
  _createSession(connectionPromise: Promise<Connection>, cb: () => void): Session;

  /**
   * Close all open sessions and other associated resources. You should
   * make sure to use this when you are done with this driver instance.
   * @return undefined
   */
  close(): undefined;

  /**
   * Acquire a session to communicate with the database. The driver maintains
   * a pool of sessions, so calling this method is normally cheap because you
   * will be pulling a session out of the common pool.
   *
   * This comes with some responsibility - make sure you always call
   * {@link Session#close()} when you are done using a session, and likewise,
   * make sure you don't close your session before you are done using it. Once
   * it is returned to the pool, the session will be reset to a clean state and
   * made available for others to use.
   *
   * @param {String} mode of session - optional
   * @return {Session} new session.
   */
  session(mode?: string): Session;
}

/** Internal stream observer used for connection state */
declare class _ConnectionStreamObserver extends StreamObserver {
    constructor(driver: Driver);

    onError(error: Error): void;

    onCompleted(message: string): void;
}