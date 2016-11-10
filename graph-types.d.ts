/**
 * Class for Node Type.
 */ 
export declare class Node {
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
export declare class Relationship {
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
declare class UnboundRelationship {
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

export declare class PathSegment {
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
export declare class Path {
    /**
     * @constructor
     * @param {Node} start  - start node
     * @param {Node} end - end node
     * @param {Array} segments - Array of Segments
     */
    constructor(start: Node, end: Node, segments: PathSegment[]);
}