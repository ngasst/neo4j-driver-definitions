export declare class Record {
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