import { WebSocketChannel } from "./ch-websocket";
import { NodeChannel } from "./ch-node";
import {Dechunker, Chunker} from "./chunking";
import { hasFeature } from "./features";
import {Packer,Unpacker} from "./packstream";
import {alloc, CombinedBuffer} from "./buf";
import {Node, Relationship, UnboundRelationship, Path, PathSegment} from '../graph-types';
import {int, isInt} from '../integer';
import {newError} from './../error';
import {ENCRYPTION_NON_LOCAL, ENCRYPTION_OFF, shouldEncrypt} from './util';

/**
 * A connection manages sending and recieving messages over a channel. A
 * connector is very closely tied to the Bolt protocol, it implements the
 * same message structure with very little frills. This means Connectors are
 * naturally tied to a specific version of the protocol, and we expect
 * another layer will be needed to support multiple versions.
 *
 * The connector tries to batch outbound messages by requiring its users
 * to call 'sync' when messages need to be sent, and it routes response
 * messages back to the originators of the requests that created those
 * response messages.
 * @access private
 */
export declare class Connection {
    /**
     * @constructor
     * @param channel - channel with a 'write' function and a 'onmessage'
     *                  callback property
     * @param url - url to connect to
     */
    constructor(channel: any, url: string);

    /**
     * "Fatal" means the connection is dead. Only call this if something
     * happens that cannot be recovered from. This will lead to all subscribers
     * failing, and the connection getting ejected from the session pool.
     *
     * @param err an error object, forwarded to all current and future subscribers
     * @private
     */
    private _handleFatalError(err: Error): void;

    _handleMessage(msg): void;

    /** Queue an INIT-message to be sent to the database */
    initialize(clientName: string, token: any, observer: any): void;

    /** Queue a PULL_ALL-message to be sent to the database */
    pullAll(observer: any): void;
    
    /** Queue a DISCARD_ALL-message to be sent to the database */
    discardAll(observer: any): void;

    /** Queue a RESET-message to be sent to the database */
    reset(observer: any): void;

    /** Queue a ACK_FAILURE-message to be sent to the database */
    _ackFailure(observer: any);

    _queueObserver(observer: any);

    /**
     * Synchronize - flush all queued outgoing messages and route their responses
     * to their respective handlers.
     */
    sync(): void;

    /** Check if this connection is in working condition */
    isOpen(): boolean;

    isEncrypted(): boolean;

    close(cb: () => void|any): void;

    _packable(value: any): any;
}

/**
 * Crete new connection to the provided url.
 * @access private
 * @param {string} url - 'neo4j'-prefixed URL to Neo4j Bolt endpoint
 * @param {object} config
 * @return {Connection} - New connection
 */
export declare function connect(url: string, config?: Object): Connection;
export declare function parseScheme(url: string): string;
export declare function parseUrl(url: string): string;