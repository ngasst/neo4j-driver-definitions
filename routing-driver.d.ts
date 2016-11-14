import { Driver } from './driver';
import { Session } from './session';
import { Connection } from './internal/connector';
/**
 * A driver that supports routing in a core-edge cluster.
 */
export declare class RoutingDriver extends Driver {
	constructor(url: string, userAgent: string, token?: any, config?: any);

	_createSession(connectionPromise: Promise<Connection>, cb: () => void): RoutingSession;

	_updateClusterView(): any;
	
	_diff(oldView: any, updatedView: any): any;

	_acquireConnection(mode: string): any;

	_forget(url: string): void;
}

export declare class ClusterView {
	constructor(routers: any[], reader: any[], writers: any[], expires: any);

	needsUpdate(): boolean;

	all(): Set<any>;

	remove(item: any): void;
}

export declare class RoutingSession extends Session {
	constructor(connectionPromise: Promise<any>, onClose: any, onFailedConnection: any);

	_onRunFailure(): any;
}

/**
 * Calls `getServers` and retrieves a new promise of a ClusterView.
 * @param session
 * @returns {Promise.<ClusterView>}
 */

export declare function newClusterView(session: RoutingSession): ClusterView;