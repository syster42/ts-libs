/**
 * interface for hosted scopes
 *
 * @interface IHostedScope
 */
export interface IHostedScope {
  startAsync(): Promise<void>;

  stopAsync(): Promise<void>;
}

export default IHostedScope;
