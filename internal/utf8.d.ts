import {alloc, NodeBuffer, HeapBuffer, CombinedBuffer} from "./buf";

export declare const platformObj: {
    encode: (str: string) => HeapBuffer;
    decode: (buffer: any, length: number) => string|void;
}