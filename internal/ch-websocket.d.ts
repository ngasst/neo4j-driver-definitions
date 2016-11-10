export declare class WebSocketChannel {
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

export declare let available: WebSocket | undefined;