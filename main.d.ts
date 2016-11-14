/**
 * Construct a new Neo4j Driver. This is your main entry point for this
 * library.
 *
 * ## Configuration
 *
 * This function optionally takes a configuration argument. Available configuration
 * options are as follows:
 *
 *     {
 *       // Encryption level: one of ENCRYPTION_ON, ENCRYPTION_OFF or ENCRYPTION_NON_LOCAL.
 *       // ENCRYPTION_NON_LOCAL is on by default in modern NodeJS installs,
 *       // but off by default in the Web Bundle and old (<=1.0.0) NodeJS installs
 *       // due to technical limitations on those platforms.
 *       encrypted: ENCRYPTION_ON|ENCRYPTION_OFF|ENCRYPTION_NON_LOCAL
 *
 *       // Trust strategy to use if encryption is enabled. There is no mode to disable
 *       // trust other than disabling encryption altogether. The reason for
 *       // this is that if you don't know who you are talking to, it is easy for an
 *       // attacker to hijack your encrypted connection, rendering encryption pointless.
 *       //
 *       // TRUST_ON_FIRST_USE is the default for modern NodeJS deployments, and works
 *       // similarly to how `ssl` works - the first time we connect to a new host,
 *       // we remember the certificate they use. If the certificate ever changes, we
 *       // assume it is an attempt to hijack the connection and require manual intervention.
 *       // This means that by default, connections "just work" while still giving you
 *       // good encrypted protection.
 *       //
 *       // TRUST_CUSTOM_CA_SIGNED_CERTIFICATES is the classic approach to trust verification -
 *       // whenever we establish an encrypted connection, we ensure the host is using
 *       // an encryption certificate that is in, or is signed by, a certificate listed
 *       // as trusted. In the web bundle, this list of trusted certificates is maintained
 *       // by the web browser. In NodeJS, you configure the list with the next config option.
 *       //
 *       // TRUST_SYSTEM_CA_SIGNED_CERTIFICATES meand that you trust whatever certificates
 *       // are in the default certificate chain of th
 *       trust: "TRUST_ON_FIRST_USE" | "TRUST_SIGNED_CERTIFICATES" | TRUST_CUSTOM_CA_SIGNED_CERTIFICATES |
 * TRUST_SYSTEM_CA_SIGNED_CERTIFICATES,
 *
 *       // List of one or more paths to trusted encryption certificates. This only
 *       // works in the NodeJS bundle, and only matters if you use "TRUST_CUSTOM_CA_SIGNED_CERTIFICATES".
 *       // The certificate files should be in regular X.509 PEM format.
 *       // For instance, ['./trusted.pem']
 *       trustedCertificates: [],
 *
 *       // Path to a file where the driver saves hosts it has seen in the past, this is
 *       // very similar to the ssl tool's known_hosts file. Each time we connect to a
 *       // new host, a hash of their certificate is stored along with the domain name and
 *       // port, and this is then used to verify the host certificate does not change.
 *       // This setting has no effect unless TRUST_ON_FIRST_USE is enabled.
 *       knownHosts:"~/.neo4j/known_hosts",
 *     }
 *
 * @param {string} url The URL for the Neo4j database, for instance "bolt://localhost"
 * @param {Map<String,String>} authToken Authentication credentials. See {@link auth} for helpers.
 * @param {Object} config Configuration object. See the configuration section above for details.
 * @returns {Driver}
 */
export declare namespace v1 {
	namespace auth {
		let basic: (username: string, password: string, realm?: string) => {scheme: string, principal: string, credentials: string, realm?: string};
		let ustom: (principal: string, credentials: string, realm: string, scheme: string, parameters?: any) => {scheme: string, principal: string, credentials: string, realm?: string};
	}
	function driver(url: string, authToken: any, config?: any): Driver|RoutingDriver;
}

export declare const types: {Node: Node; Relationship: Relationship; UnboundRelationship: UnboundRelationship; PathSegment: PathSegment; Path:Path; Result: Result; ResultSummary: ResultSummary; Record: Record};

export declare const session: {READ: string; WRITE: string;}

export declare const error: {SERVICE_UNAVAILABLE: string; SESSION_EXPIRED: string};

export declare const forExport: {driver; int; isInt; integer; Neo4jError; auth; types; session; error};

export declare default forExport;