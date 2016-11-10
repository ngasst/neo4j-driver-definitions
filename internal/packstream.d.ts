import { debug } from "./log";
import { alloc } from "./buf";
import { utf8 } from "./utf8";
import { Integer } from "../integer";
import { int } from "../integer";
import { newError } from './../error';

export declare class Structure {
    /**
     * Create new instance
     */
    constructor(signature: any, fields: string[]);

    toString(): string;
}

export declare class Packer {
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
export declare class Unpacker {
  constructor ();


  unpackList(size: number, buffer: any): any[];

  unpackMap(size: number, buffer: any): any;

  unpackStruct(size: number, buffer: any): any;
  
  unpack(size: number): any;
}