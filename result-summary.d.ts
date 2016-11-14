import {int, isInt} from './integer';

/**
  * A ResultSummary instance contains structured metadata for a {Result}.
  * @access public
  */
export declare class ResultSummary {
  statementType: string;
  counters: StatementStatistics;
  updateStatistics: StatementStatistics;
  plan: ProfiledPlan;
  notifications: Notification[];
  resultConsumeAfter: any;
  resultAvailableAfter: any;
  /**
   * @constructor
   * @param {string} statement - The statement this summary is for
   * @param {Object} parameters - Parameters for the statement
   * @param {Object} metadata - Statement metadata
   */
  constructor(statement: string, parameters: any, metadata: any);

  _buildNotifications(notifications?: Notification[]): Notification[];

  /**
   * Check if the result summary has a plan
   * @return {boolean}
   */
  hasPlan(): boolean;

  /**
   * Check if the result summary has a profile
   * @return {boolean}
   */
  hasProfile(): boolean;
}

/**
  * Class for execution plan received by prepending Cypher with EXPLAIN.
  * @access public
  */
export declare class Plan {
  /**
   * Create a Plan instance
   * @constructor
   * @param {Object} plan - Object with plan data
   */
  constructor(plan: any);
}

/**
  * Class for execution plan received by prepending Cypher with PROFILE.
  * @access public
  */
export declare class ProfiledPlan {
  /**
   * Create a ProfiledPlan instance
   * @constructor
   * @param {Object} profile - Object with profile data
   */
  constructor(profile: any);
}

/**
  * Get statistical information for a {Result}.
  * @access public
  */
export declare class StatementStatistics {
  /**
   * Structurize the statistics
   * @constructor
   * @param {Object} statistics - Result statistics
   */
  constructor(statistics: IStatementStatistics);

  /**
   * Did the database get updated?
   * @return {boolean}
   */
  containsUpdates(): boolean;

  /**
   * @return {Number} - Number of nodes created.
   */
  nodesCreated(): number;

  /**
   * @return {Number} - Number of nodes deleted.
   */
  nodesDeleted(): number;

  /**
   * @return {Number} - Number of relationships created.
   */
  relationshipsCreated(): number;

  /**
   * @return {Number} - Number of nodes deleted.
   */
  relationshipsDeleted(): number;

  /**
   * @return {Number} - Number of properties set.
   */
  propertiesSet(): number;

  /**
   * @return {Number} - Number of labels added.
   */
  labelsAdded(): number;

  /**
   * @return {Number} - Number of labels removed.
   */
  labelsRemoved(): number;

  /**
   * @return {Number} - Number of indexes added.
   */
  indexesAdded(): number;

  /**
   * @return {Number} - Number of indexes removed.
   */
  indexesRemoved(): number;

  /**
   * @return {Number} - Number of contraints added.
   */
  constraintsAdded(): number;

  /**
   * @return {Number} - Number of contraints removed.
   */
  constraintsRemoved(): number;
}

/**
  * Class for Cypher notifications
  * @access public
  */
export declare class Notification {
  /**
   * Create a Notification instance
   * @constructor
   * @param {Object} notification - Object with notification data
   */
  constructor(notification: Notification);

  static _constructPosition(pos: {offset: number; line: number; column: number});
}

export declare const statementType: {READ_ONLY: string; READ_WRITE: string; WRITE_ONLY: string; SCHEMA_WRITE: string}

export interface IStatementStatistics {
      nodesCreated: number;
      nodesDeleted: number;
      relationshipsCreated: number;
      relationshipsDeleted: number;
      propertiesSet: number;
      labelsAdded: number;
      labelsRemoved: number;
      indexesAdded: number;
      indexesRemoved: number;
      constraintsAdded: number;
      constraintsRemoved:number;
    }