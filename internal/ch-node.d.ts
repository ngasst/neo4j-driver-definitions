import {NodeBuffer} from './buf';
import {isLocalHost, ENCRYPTION_NON_LOCAL, ENCRYPTION_OFF} from './util';
import {newError, SESSION_EXPIRED} from './../error';

declare class NodeChannel {
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