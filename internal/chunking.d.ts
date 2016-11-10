import {alloc, BaseBuffer, CombinedBuffer} from './buf';

/**
 * Looks like a writable buffer, chunks output transparently into a channel below.
 * @access private
 */
export declare class Chunker {
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
export declare class Dechunker {
  constructor();

  AWAITING_CHUNK(buf: any): any;

  IN_HEADER(buf: any): any;

  IN_CHUNK(buf: any): any;

  CLOSED(buf): void;

  /** Called when a complete chunk header has been recieved */
  _onHeader(header: any): any;

  write(buf: any): void;
}