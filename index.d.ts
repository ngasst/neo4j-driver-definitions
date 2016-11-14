// Type definitions for Neo4j Javascript Driver v1.1
// Project: https://github.com/neo4j/neo4j-javascript-driver/
// Definitions by: Gaston Ndanyuzwe <https://github.com/ngasst>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Documentation : https://neo4j.com/docs/api/javascript-driver/current/
/// <reference types='node' />
/// <reference types='ws' />

declare module "neo4j-driver" {
import * as WebSocket from 'ws';
import { Subscription } from '@reactivex/rxjs';

///internal/buf.d.ts

/**
  * Common base with default implementation for most buffer methods.
  * Buffers are stateful - they track a current "position", this helps greatly
  * when reading and writing from them incrementally. You can also ignore the
  * stateful read/write methods.
  * readXXX and writeXXX-methods move the inner position of the buffer.
  * putXXX and getXXX-methods do not.
  * @access private
  */
  export class BaseBuffer {
     /**
     * Create a instance with the injected size.
     * @constructor
     * @param {Integer} size
     */
    constructor(size: number);

    /**
     * @param p
     */
    getInt16(p: any): number;

    /**
     * @param p
     */
    getUInt16(p: any): number;

    /**
     * @param p
     */
    getInt32(p: any): number;

    /**
     * @param p
     */
    getUInt32(p: any): number;

    /**
     * @param p
     */
    getInt64(p: any): number;

    /**
     * Get a slice of this buffer. This method does not copy any data,
     * but simply provides a slice view of this buffer
     * @param start
     * @param length
     */
    getSlice(start: number, length: number, buf: BaseBuffer): SliceBuffer;

    /**
     * @param p
     * @param val
     */
    putInt16(p: any, val: any): void;

    /**
     * @param p
     * @param val
     */
    putUInt16(p: any, val: any): void;

    /**
     * @param p
     * @param val
     */
    putInt32(p: any, val: any): void;

    /**
     * @param p
     * @param val
     */
    putUInt32(p: any, val: any): void;

    /**
     * @param p
     * @param val
     */
    putInt64(p: any, val: any): void;

    /**
     * @param position
     * @param other
     */
    putBytes(position: number, other: any): void;

    /**
     * Read from state position.
     */
    readUInt8(): any;

    /**
     * Read from state position.
     */
    readInt8(): any;

    /**
     * Read from state position.
     */
    readUInt16(): any;

    /**
     * Read from state position.
     */
    readInt16(): any;

    /**
     * Read from state position.
     */
    readUInt32(): any;

    /**
     * Read from state position.
     */
    readInt32(): any;

    /**
     * Read from state position.
     */
    readInt64(): any;

    /**
     * Read from state position.
     */
    readFloat64(): any;

    /**
     * Write to state position.
     * @param val
     */
    writeInt8(val: any): void;

    /**
     * Write to state position.
     * @param val
     */
    writeInt16(val: any): void;

    /**
     * Write to state position.
     * @param val
     */
    writeInt32(val: any): void;

    /**
     * Write to state position.
     * @param val
     */
    writeUInt32(val: any): void;

    /**
     * Write to state position.
     * @param val
     */
    writeInt64(val: any): void;

    /**
     * Write to state position.
     * @param val
     */
    writeFloat64(val: any): void;

    /**
     * Write to state position.
     * @param val
     */
    writeBytes(val: any): void;

    /**
     * Get a slice of this buffer. This method does not copy any data,
     * but simply provides a slice view of this buffer
     * @param length
     */
    readSlice(length: number): SliceBuffer;

    _updatePos(length: number): number;

    /**
     * Get remaning
     */
    remaining(): number;

    /**
     * Has remaning
     */
    hasRemaining(): boolean;

    /**
     * Reset position state
     */
    reset(): void;

    /**
     * Get string representation of buffer and it's state.
     * @return {string} Buffer as a string
     */
    toString(): string;

    /**
     * Get string representation of buffer.
     * @return {string} Buffer as a string
     */
    toHex(): string;
  }

/**
 * Basic buffer implementation that should work in most any modern JS env.
 * @access private
 */
export class HeapBuffer extends BaseBuffer {
    constructor(arg: any);

    putUInt8 (position: number, val: any): void;

    getUInt8 (position: number): number;

    putInt8 (position, val: any): void;

    getInt8 (position: number): number;

    getFloat64 (position: number): number;

    putFloat64 (position, val: any): void;

    getSlice (start: number, length: number): SliceBuffer;

    /** 
     * Specific to HeapBuffer, this gets a DataView from the
     * current position and of the specified length. 
     */
    readView (length: number): DataView;
}

/**
 * Represents a view as slice of another buffer.
 * @access private
 */
export class SliceBuffer extends BaseBuffer {
    constructor(start: number, length: number, inner: any);

    putUInt8(position: number, val: any): void;

    getUInt8(position: number): number;

    putInt8(position: number, val: any):void;

    putFloat64(position: number, val: any): void;

    getInt8(position: number): number;

    getFloat64(position: number): number;
}

/**
 * Buffer that combines multiple buffers, exposing them as one single buffer.
 * @access private
 */
export class CombinedBuffer extends BaseBuffer {
    contructor(buffers: any[]);

    getUInt8 (position): void|number;

    getInt8 (position): void|number;

    getFloat64 (position): number;
}

/**
 * Buffer used in a Node.js environment
 * @access private
 */
export class NodeBuffer extends BaseBuffer {
  constructor(arg: any);

  getUInt8 (position: number): number;

  getInt8 (position: number): number;

  getFloat64 (position: number): number;

  putUInt8 (position: number, val: any): void;

  putInt8 (position: number, val: any): void;

  putFloat64 (position, val): void

  putBytes (position, val): void;

  getSlice (start, length): NodeBuffer
}


/**
 * Allocate a new buffer using whatever mechanism is most sensible for the
 * current platform
 * @access private
 * @param {Integer} size
 * @return new buffer
 */
  export function alloc(size: number): any;

///internal/ch-node.d.ts

 class NodeChannel {
    /**
     * Create new instance
     * @param {Object} opts - Options object
     * @param {string} opts.host - The host, including protocol to connect to.
     * @param {Integer} opts.port - The port to use.
     */
    constructor (opts: {host: string, port: number});

    _handleConnectionError(err: Error): void;

    _handleConnectionTerminated(): void;

    isEncrypted(): boolean;

    /**
     * Write the passed in buffer to connection
     * @param {NodeBuffer} buffer - Buffer to write
     */
    write (buffer): NodeBuffer;

    /**
     * Close the connection
     * @param {function} cb - Function to call on close.
     */
    close(cb:() => null): void|null;

}

export let _nodeChannelModule: {channel: NodeChannel, available: boolean};

///internal/ch-websocket.d.ts

export class WebSocketChannel {
    /**
     * Create new instance
     * @param {Object} opts - Options object
     * @param {string} opts.host - The host, including protocol to connect to.
     * @param {Integer} opts.port - The port to use.
     */
    constructor (opts: any);

    _handleConnectionError(): void;

    isEncrypted(): boolean;

    /**
     * Write the passed in buffer to connection
     * @param {HeapBuffer} buffer - Buffer to write
     */
    write (buffer: any): void;

    /**
     * Close the connection
     * @param {function} cb - Function to call on close.
     */
    close(cb?: () => null|any):void;
}

export let available: WebSocket | undefined;

///internal/chunking.d.ts

/**
 * Looks like a writable buffer, chunks output transparently into a channel below.
 * @access private
 */
export class Chunker {
    constructor(channel: string, bufferSize: number);
    
    putUInt8(position: number, val: any): void;
    
    putInt8(position: number, val: any): void;
    
    putFloat64(position: number, val: any): void;
    
    putBytes(position: number, data: any): Chunker;
    
    flush(): Chunker;
    
    /**
    * Bolt messages are encoded in one or more chunks, and the boundary between two messages
    * is encoded as a 0-length chunk, `00 00`. This inserts such a message boundary, closing
    * any currently open chunk as needed
    */
    messageBoundary(): void;

    /** Ensure at least the given size is available for writing */
    _ensure(size: any): void;

    _closeChunkIfOpen(): void;
}

/**
 * Combines chunks until a complete message is gathered up, and then forwards that
 * message to an 'onmessage' listener.
 * @access private
 */
export class Dechunker {
  constructor();

  AWAITING_CHUNK(buf: any): any;

  IN_HEADER(buf: any): any;

  IN_CHUNK(buf: any): any;

  CLOSED(buf): void;

  /** Called when a complete chunk header has been recieved */
  _onHeader(header: any): any;

  write(buf: any): void;
}

///internal/connector.d.ts

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
export class Connection {
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
export function connect(url: string, config?: Object): Connection;
export function parseScheme(url: string): string;
export function parseUrl(url: string): string;

///internal/features.d.ts

export function hasFeature(name: string): FEATURES;

 interface FEATURES {
    trust_on_first_use: () => boolean;
}

///internal/log.d.ts

export function debug(val: any): void;

///internal/packstream.d.ts

export class Structure {
    /**
     * Create new instance
     */
    constructor(signature: any, fields: string[]);

    toString(): string;
}

export class Packer {
    /**
     * Class to pack
    * @access private
    */
    constructor(x: any, onError: (message: string, code?: string) => any);

    /**
     * Creates a packable function out of the provided value
     * @param x the value to pack
     * @param onError callback for the case when value cannot be packed
     * @returns Function
     */
    packable(x: any, onError: (message: string, code?: string) => void): () => void | any;

    /**
     * Packs a struct
     * @param signature the signature of the struct
     * @param packableFields the fields of the struct, make sure you call `packable on all fields`
     */
    packStruct(signature: any, packableFields: any[], onError: (message: string, code?: string) => any|void): void;

    packInteger(x: number): void;

    packFloat(x: number): void;

    packString(x: string, onError: (message: string, code?: string) => void|any): void;

    packListHeader(size: number, onError: (message: string, code?: string) => void|any): void;

    packMapHeader(size: number, onError: (message: string, code?: string) => void|any): void;

    packStructHeader(size: number, onError: (message: string, code?: string) => void|any): void;
}

/**
 * Class to unpack
* @access private
*/
export class Unpacker {
  constructor ();


  unpackList(size: number, buffer: any): any[];

  unpackMap(size: number, buffer: any): any;

  unpackStruct(size: number, buffer: any): any;
  
  unpack(size: number): any;
}

///internal/pool.d.ts

export class Pool {
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

///internal/stream-observer.d.ts

export class StreamObserver {
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

///internal/utf8.d.ts

export const platformObj: {
    encode: (str: string) => HeapBuffer;
    decode: (buffer: any, length: number) => string|void;
}

///internal/util.d.ts

export let ENCRYPTION_NON_LOCAL: string;
export let ENCRYPTION_OFF: string;
export let ENCRYPTION_ON: string;

export function isLocalHost(host: string): boolean;

/* Coerce an encryption setting to a definitive boolean value,
 * given a valid default and a target host. If encryption is
 * explicitly set on or off, then the mapping is a simple
 * conversion to true or false respectively. If set to
 * ENCRYPTION_NON_LOCAL then respond according to whether or
 * not the host is localhost/127.x.x.x. In all other cases
 * (including undefined) then fall back to the default and
 * re-evaluate.
 */
export function shouldEncrypt(encryption: string, encrpyptionDefault: string, host: string): boolean;

//driver.d.ts

export const READ: string;
export const WRITE: string;

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
export class Driver {
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
 class _ConnectionStreamObserver extends StreamObserver {
    constructor(driver: Driver);

    onError(error: Error): void;

    onCompleted(message: string): void;
}

//error.d.ts

export class Neo4jError extends Error{
    constructor(message: string, code?: string);
}

export function newError(message: string, code?: string): Neo4jError;

export let SERVICE_UNAVAILABLE: string;
export let SESSION_EXPIRED: string;


//graph-types.d.ts

/**
 * Class for Node Type.
 */ 
export class Node {
    /**
     * @constructor
     * @param {string} identity - Unique identity
     * @param {Array} labels - Array for all labels
     * @param {Object} properties - Map with node properties
     */
    constructor(identity: string, labels: string[], properties: any);

    toString(): string;

}

/**
 * Class for Relationship Type.
 */
export class Relationship {
    /**
     * @constructor
     * @param {string} identity - Unique identity
     * @param {string} start - Identity of start Node
     * @param {string} end - Identity of end Node
     * @param {string} type - Relationship type
     * @param {Object} properties - Map with relationship properties
     */
    constructor(identity: string, start: string, end: string, type: string, properties: any);

    toString(): string;
}

/**
 * Class for UnboundRelationship Type.
 * @access private
 */ 
 class UnboundRelationship {
    /**
     * @constructor
     * @param {string} identity - Unique identity
     * @param {string} type - Relationship type
     * @param {Object} properties - Map with relationship properties
     */
    constructor(identity: string, type: string, properties: any);

    /**
     * Bind relationship
     * @param {string} start - Indentity of start node
     * @param {string} end - Indentity of end node
     * @return {Relationship} - Created relationship
     */
    bind(start: string, end: string): Relationship;

    toString(): string;
}

export class PathSegment {
    /**
     * @constructor
     * @param {string} start - Identity of start Node
     * @param {Relationship} rel - Relationship segment
     * @param {string} end - Identity of end Node
     */
    constructor(start: string, rel: Relationship, end: string);
}

/**
 * Class for Path Type.
 */
export class Path {
    /**
     * @constructor
     * @param {Node} start  - start node
     * @param {Node} end - end node
     * @param {Array} segments - Array of Segments
     */
    constructor(start: Node, end: Node, segments: PathSegment[]);
}

//integer.d.ts

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Integers.
 * @access public
 * @exports Integer
 * @class A Integer class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @constructor
 *
 * @deprecated This class will be removed or made internal in a future version of the driver.
 */
export class Integer {
  constructor(low: number, high: number);

  // The internal representation of an Integer is the two given signed, 32-bit values.
  // We use 32-bit pieces because these are the size of integers on which
  // Javascript performs bit-operations.  For operations like addition and
  // multiplication, we split each number into 16 bit pieces, which can easily be
  // multiplied within Javascript's floating-point representation without overflow
  // or change in sign.
  //
  // In the algorithms below, we frequently reduce the negative case to the
  // positive case by negating the input(s) and then post-processing the result.
  // Note that we must ALWAYS check specially whether those values are MIN_VALUE
  // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
  // a positive number, it overflows back into a negative).  Not handling this
  // case would often result in infinite recursion.
  //
  // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
  // methods on which they depend.


  inSafeRange(): boolean;

  /**
   * Converts the Integer to an exact javascript Number, assuming it is a 32 bit integer.
   * @returns {number}
   * @expose
   */
  toInt(): number;

  /**
   * Converts the Integer to a the nearest floating-point representation of this value (double, 53 bit mantissa).
   * @returns {number}
   * @expose
   */
  toNumber(): number;

  /**
   * Converts the Integer to a string written in the specified radix.
   * @param {number=} radix Radix (2-36), defaults to 10
   * @returns {string}
   * @override
   * @throws {RangeError} If `radix` is out of range
   * @expose
   */
  toString(radix: number): string;

  /**
   * Gets the high 32 bits as a signed integer.
   * @returns {number} Signed high bits
   * @expose
   */
  getHighBits(): number;

  /**
   * Gets the low 32 bits as a signed integer.
   * @returns {number} Signed low bits
   * @expose
   */
  getLowBits(): number;

  /**
   * Gets the number of bits needed to represent the absolute value of this Integer.
   * @returns {number}
   * @expose
   */
  getNumBitsAbs(): number;

  /**
   * Tests if this Integer's value equals zero.
   * @returns {boolean}
   * @expose
   */
  isZero(): boolean;

  /**
   * Tests if this Integer's value is negative.
   * @returns {boolean}
   * @expose
   */
  isNegative(): boolean;

  /**
   * Tests if this Integer's value is positive.
   * @returns {boolean}
   * @expose
   */
  isPositive(): boolean;

  /**
   * Tests if this Integer's value is odd.
   * @returns {boolean}
   * @expose
   */
  isOdd(): boolean;

  /**
   * Tests if this Integer's value is even.
   * @returns {boolean}
   * @expose
   */
  isEven(): boolean;

  /**
   * Tests if this Integer's value equals the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  equals(other: number): boolean;

  /**
   * Tests if this Integer's value differs from the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  notEquals(other: number): boolean;

  /**
   * Tests if this Integer's value is less than the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  lessThan(other: number): boolean;

  /**
   * Tests if this Integer's value is less than or equal the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  lessThanOrEqual(other: number): boolean;

  /**
   * Tests if this Integer's value is greater than the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  greaterThan(other: number): boolean;

  /**
   * Tests if this Integer's value is greater than or equal the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {boolean}
   * @expose
   */
  greaterThanOrEqual(other: number): boolean;

  /**
   * Compares this Integer's value with the specified's.
   * @param {!Integer|number|string} other Other value
   * @returns {number} 0 if they are the same, 1 if the this is greater and -1
   *  if the given one is greater
   * @expose
   */
  compare(other: number): number;

  /**
   * Negates this Integer's value.
   * @returns {!Integer} Negated Integer
   * @expose
   */
  negate(): number;

  /**
   * Returns the sum of this and the specified Integer.
   * @param {!Integer|number|string} addend Addend
   * @returns {!Integer} Sum
   * @expose
   */
  add(addend: number): number;

  /**
   * Returns the difference of this and the specified Integer.
   * @param {!Integer|number|string} subtrahend Subtrahend
   * @returns {!Integer} Difference
   * @expose
   */
  subtract(subtrahend: number): number;

  /**
   * Returns the product of this and the specified Integer.
   * @param {!Integer|number|string} multiplier Multiplier
   * @returns {!Integer} Product
   * @expose
   */
  multiply(multiplier: number): number;

  /**
   * Returns this Integer divided by the specified.
   * @param {!Integer|number|string} divisor Divisor
   * @returns {!Integer} Quotient
   * @expose
   */
  div(divisor: Integer|number|string): Integer;

  /**
   * Returns this Integer modulo the specified.
   * @param {!Integer|number|string} divisor Divisor
   * @returns {!Integer} Remainder
   * @expose
   */
  modulo(divisor: Integer|number|string): Integer;

  /**
   * Returns the bitwise NOT of this Integer.
   * @returns {!Integer}
   * @expose
   */
  not(): Integer;

  /**
   * Returns the bitwise AND of this Integer and the specified.
   * @param {!Integer|number|string} other Other Integer
   * @returns {!Integer}
   * @expose
   */
  and(other: Integer|number|string): Integer;

  /**
   * Returns the bitwise OR of this Integer and the specified.
   * @param {!Integer|number|string} other Other Integer
   * @returns {!Integer}
   * @expose
   */
  or(other: Integer|number|string): Integer;

  /**
   * Returns the bitwise XOR of this Integer and the given one.
   * @param {!Integer|number|string} other Other Integer
   * @returns {!Integer}
   * @expose
   */
  xor(other: Integer|number|string): Integer;

  /**
   * Returns this Integer with bits shifted to the left by the given amount.
   * @param {number|!Integer} numBits Number of bits
   * @returns {!Integer} Shifted Integer
   * @expose
   */
  shiftLeft(numBits: number|Integer): Integer;

  /**
   * Returns this Integer with bits arithmetically shifted to the right by the given amount.
   * @param {number|!Integer} numBits Number of bits
   * @returns {!Integer} Shifted Integer
   * @expose
   */
  shiftRight(numBits: number|Integer): Integer;
}

export const int: (val: Integer|number|string|{low: number; high: number}) => Integer;
export const isInt: (obj: Object) => boolean;
export const inSafeRange: (val: Integer|number|string|{low: number; high: number}) => boolean;
export const toNumber: (val: any) => number;
export const toString: (radix: number) => string;

//main.d.ts

/**
 * Construct a new Neo4j Driver. This is your main entry point for this
 * library.
 *
 * ## Configuration
 *
 * This function optionally takes a configuration argument. Available configuration
 * options are as follows:
 *
 *     {
 *       // Encryption level: one of ENCRYPTION_ON, ENCRYPTION_OFF or ENCRYPTION_NON_LOCAL.
 *       // ENCRYPTION_NON_LOCAL is on by default in modern NodeJS installs,
 *       // but off by default in the Web Bundle and old (<=1.0.0) NodeJS installs
 *       // due to technical limitations on those platforms.
 *       encrypted: ENCRYPTION_ON|ENCRYPTION_OFF|ENCRYPTION_NON_LOCAL
 *
 *       // Trust strategy to use if encryption is enabled. There is no mode to disable
 *       // trust other than disabling encryption altogether. The reason for
 *       // this is that if you don't know who you are talking to, it is easy for an
 *       // attacker to hijack your encrypted connection, rendering encryption pointless.
 *       //
 *       // TRUST_ON_FIRST_USE is the default for modern NodeJS deployments, and works
 *       // similarly to how `ssl` works - the first time we connect to a new host,
 *       // we remember the certificate they use. If the certificate ever changes, we
 *       // assume it is an attempt to hijack the connection and require manual intervention.
 *       // This means that by default, connections "just work" while still giving you
 *       // good encrypted protection.
 *       //
 *       // TRUST_CUSTOM_CA_SIGNED_CERTIFICATES is the classic approach to trust verification -
 *       // whenever we establish an encrypted connection, we ensure the host is using
 *       // an encryption certificate that is in, or is signed by, a certificate listed
 *       // as trusted. In the web bundle, this list of trusted certificates is maintained
 *       // by the web browser. In NodeJS, you configure the list with the next config option.
 *       //
 *       // TRUST_SYSTEM_CA_SIGNED_CERTIFICATES meand that you trust whatever certificates
 *       // are in the default certificate chain of th
 *       trust: "TRUST_ON_FIRST_USE" | "TRUST_SIGNED_CERTIFICATES" | TRUST_CUSTOM_CA_SIGNED_CERTIFICATES |
 * TRUST_SYSTEM_CA_SIGNED_CERTIFICATES,
 *
 *       // List of one or more paths to trusted encryption certificates. This only
 *       // works in the NodeJS bundle, and only matters if you use "TRUST_CUSTOM_CA_SIGNED_CERTIFICATES".
 *       // The certificate files should be in regular X.509 PEM format.
 *       // For instance, ['./trusted.pem']
 *       trustedCertificates: [],
 *
 *       // Path to a file where the driver saves hosts it has seen in the past, this is
 *       // very similar to the ssl tool's known_hosts file. Each time we connect to a
 *       // new host, a hash of their certificate is stored along with the domain name and
 *       // port, and this is then used to verify the host certificate does not change.
 *       // This setting has no effect unless TRUST_ON_FIRST_USE is enabled.
 *       knownHosts:"~/.neo4j/known_hosts",
 *     }
 *
 * @param {string} url The URL for the Neo4j database, for instance "bolt://localhost"
 * @param {Map<String,String>} authToken Authentication credentials. See {@link auth} for helpers.
 * @param {Object} config Configuration object. See the configuration section above for details.
 * @returns {Driver}
 */
export namespace v1 {
	namespace auth {
		let basic: (username: string, password: string, realm?: string) => {scheme: string, principal: string, credentials: string, realm?: string};
		let ustom: (principal: string, credentials: string, realm: string, scheme: string, parameters?: any) => {scheme: string, principal: string, credentials: string, realm?: string};
	}
	function driver(url: string, authToken: any, config?: any): Driver|RoutingDriver;
}

export const types: {Node: Node; Relationship: Relationship; UnboundRelationship: UnboundRelationship; PathSegment: PathSegment; Path:Path; Result: Result; ResultSummary: ResultSummary; Record: Record};

export const session: {READ: string; WRITE: string;}

export const error: {SERVICE_UNAVAILABLE: string; SESSION_EXPIRED: string};

export const forExport: {driver; int; isInt; integer; Neo4jError; auth; types; session; error};

export default forExport;

//record.d.ts

export class Record {
    /**
     * Create a new record object.
     * @constructor
     * @access private
     * @param {Object} keys An array of field keys, in the order the fields appear
     *                      in the record
     * @param {Object} fields An array of field values
     * @param {Object} fieldLookup An object of fieldName -> value index, used to map
     *                            field names to values. If this is null, one will be
     *                            generated.
     */
    constructor(keys: string[], fields: string[], fieldLookup?: Object|null);

    /**
     * Run the given function for each field in this record. The function
     * will get three arguments - the value, the key and this record, in that
     * order.
     *
     * @param visitor
     */
    forEach(visitor: (fields: string[], keys: string, rcd: Record) => void): Object;

    /**
     * Generates an object out of the current Record
     *
     * @returns {Object}
     */
    toObject(): Object;

    /**
     * Get a value from this record, either by index or by field key.
     *
     * @param {string|Number} key Field key, or the index of the field.
     * @returns {*}
     */
    get(key: string|number): any;

    /**
     * Get a value from this record, either by index or by field key.
     *
     * @param {string|Number} key Field key, or the index of the field.
     * @returns {*}
     */
    has(key: string|number): boolean;

}

//result-summary.d.ts

/**
  * A ResultSummary instance contains structured metadata for a {Result}.
  * @access public
  */
export class ResultSummary {
  statementType: string;
  counters: StatementStatistics;
  updateStatistics: StatementStatistics;
  plan: ProfiledPlan;
  notifications: Notification[];
  resultConsumeAfter: any;
  resultAvailableAfter: any;
  /**
   * @constructor
   * @param {string} statement - The statement this summary is for
   * @param {Object} parameters - Parameters for the statement
   * @param {Object} metadata - Statement metadata
   */
  constructor(statement: string, parameters: any, metadata: any);

  _buildNotifications(notifications?: Notification[]): Notification[];

  /**
   * Check if the result summary has a plan
   * @return {boolean}
   */
  hasPlan(): boolean;

  /**
   * Check if the result summary has a profile
   * @return {boolean}
   */
  hasProfile(): boolean;
}

/**
  * Class for execution plan received by prepending Cypher with EXPLAIN.
  * @access public
  */
export class Plan {
  /**
   * Create a Plan instance
   * @constructor
   * @param {Object} plan - Object with plan data
   */
  constructor(plan: any);
}

/**
  * Class for execution plan received by prepending Cypher with PROFILE.
  * @access public
  */
export class ProfiledPlan {
  /**
   * Create a ProfiledPlan instance
   * @constructor
   * @param {Object} profile - Object with profile data
   */
  constructor(profile: any);
}

/**
  * Get statistical information for a {Result}.
  * @access public
  */
export class StatementStatistics {
  /**
   * Structurize the statistics
   * @constructor
   * @param {Object} statistics - Result statistics
   */
  constructor(statistics: IStatementStatistics);

  /**
   * Did the database get updated?
   * @return {boolean}
   */
  containsUpdates(): boolean;

  /**
   * @return {Number} - Number of nodes created.
   */
  nodesCreated(): number;

  /**
   * @return {Number} - Number of nodes deleted.
   */
  nodesDeleted(): number;

  /**
   * @return {Number} - Number of relationships created.
   */
  relationshipsCreated(): number;

  /**
   * @return {Number} - Number of nodes deleted.
   */
  relationshipsDeleted(): number;

  /**
   * @return {Number} - Number of properties set.
   */
  propertiesSet(): number;

  /**
   * @return {Number} - Number of labels added.
   */
  labelsAdded(): number;

  /**
   * @return {Number} - Number of labels removed.
   */
  labelsRemoved(): number;

  /**
   * @return {Number} - Number of indexes added.
   */
  indexesAdded(): number;

  /**
   * @return {Number} - Number of indexes removed.
   */
  indexesRemoved(): number;

  /**
   * @return {Number} - Number of contraints added.
   */
  constraintsAdded(): number;

  /**
   * @return {Number} - Number of contraints removed.
   */
  constraintsRemoved(): number;
}

/**
  * Class for Cypher notifications
  * @access public
  */
export class Notification {
  /**
   * Create a Notification instance
   * @constructor
   * @param {Object} notification - Object with notification data
   */
  constructor(notification: Notification);

  static _constructPosition(pos: {offset: number; line: number; column: number});
}

export const statementType: {READ_ONLY: string; READ_WRITE: string; WRITE_ONLY: string; SCHEMA_WRITE: string}

export interface IStatementStatistics {
      nodesCreated: number;
      nodesDeleted: number;
      relationshipsCreated: number;
      relationshipsDeleted: number;
      propertiesSet: number;
      labelsAdded: number;
      labelsRemoved: number;
      indexesAdded: number;
      indexesRemoved: number;
      constraintsAdded: number;
      constraintsRemoved:number;
    }

//result.d.ts

/**
  * A stream of {@link Record} representing the result of a statement.
  * @access public
  */
export  class Result {
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

//routing-driver.d.ts

/**
 * A driver that supports routing in a core-edge cluster.
 */
export class RoutingDriver extends Driver {
	constructor(url: string, userAgent: string, token?: any, config?: any);

	_createSession(connectionPromise: Promise<Connection>, cb: () => void): RoutingSession;

	_updateClusterView(): any;
	
	_diff(oldView: any, updatedView: any): any;

	_acquireConnection(mode: string): any;

	_forget(url: string): void;
}

export class ClusterView {
	constructor(routers: any[], reader: any[], writers: any[], expires: any);

	needsUpdate(): boolean;

	all(): Set<any>;

	remove(item: any): void;
}

export class RoutingSession extends Session {
	constructor(connectionPromise: Promise<any>, onClose: any, onFailedConnection: any);

	_onRunFailure(): any;
}

/**
 * Calls `getServers` and retrieves a new promise of a ClusterView.
 * @param session
 * @returns {Promise.<ClusterView>}
 */

export function newClusterView(session: RoutingSession): ClusterView;

//session.d.ts

export class Session {
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

//transaction.d.ts

/**
 * Represents a transaction in the Neo4j database.
 *
 * @access public
 */
export class Transaction {
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
 class _TransactionStreamObserver extends StreamObserver {
    constructor(tx: any);

    onError(error: any|Error): void;
}

 interface States {
    ACTIVE: State;
    FAILED: State;
    SUCCEDED: State;
    ROLLED_BACK: State;
}

 interface State {
    commit: (conn: any, observer: _TransactionStreamObserver) => StateResult;
    rollback: (conn: any, observer: _TransactionStreamObserver) => StateResult;
    run: (conn: any, observer: _TransactionStreamObserver, statement: string|any, parameters: any) => StateResult;
}

 interface StateResult {
    result: Result;
    state: State;
}

 function _runDiscardAll(msg: string, conn: any, observer: _TransactionStreamObserver): Result;
}