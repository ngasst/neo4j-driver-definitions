export declare let ENCRYPTION_NON_LOCAL: string;
export declare let ENCRYPTION_OFF: string;
export declare let ENCRYPTION_ON: string;

export declare function isLocalHost(host: string): boolean;

/* Coerce an encryption setting to a definitive boolean value,
 * given a valid default and a target host. If encryption is
 * explicitly set on or off, then the mapping is a simple
 * conversion to true or false respectively. If set to
 * ENCRYPTION_NON_LOCAL then respond according to whether or
 * not the host is localhost/127.x.x.x. In all other cases
 * (including undefined) then fall back to the default and
 * re-evaluate.
 */
export declare function shouldEncrypt(encryption: string, encrpyptionDefault: string, host: string): boolean;