export declare class Neo4jError extends Error{
    constructor(message: string, code?: string);
}

export declare function newError(message: string, code?: string): Neo4jError;