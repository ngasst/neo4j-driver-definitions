/**
  * Common base with default implementation for most buffer methods.
  * Buffers are stateful - they track a current "position", this helps greatly
  * when reading and writing from them incrementally. You can also ignore the
  * stateful read/write methods.
  * readXXX and writeXXX-methods move the inner position of the buffer.
  * putXXX and getXXX-methods do not.
  * @access private
  */
  export declare class BaseBuffer {
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
export declare class HeapBuffer extends BaseBuffer {
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
export declare class SliceBuffer extends BaseBuffer {
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
export declare class CombinedBuffer extends BaseBuffer {
    contructor(buffers: any[]);

    getUInt8 (position): void|number;

    getInt8 (position): void|number;

    getFloat64 (position): number;
}

/**
 * Buffer used in a Node.js environment
 * @access private
 */
export declare class NodeBuffer extends BaseBuffer {
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
  export declare function alloc(size: number): any;