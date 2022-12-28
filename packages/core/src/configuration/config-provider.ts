import ChangeSetType from '../enums/changeset-type.js';
import ChangeSet from './changeset.js';

/**
 * config provider class
 *
 * @class ConfigProvider
 */
export class ConfigProvider {
  /**
   * holds the config data
   *
   * @protected
   * @type {{ [key: string]: string }}
   * @memberof ConfigProvider
   */
  protected data: { [key: string]: string } = {};

  /**
   * Callback when config is written
   *
   * @memberof ConfigProvider
   */
  // eslint-disable-next-line class-methods-use-this
  public configWritten: (changes: ChangeSet[]) => void = () => void 0;

  /**
   * Callback when a config entry is changed
   *
   * @memberof ConfigProvider
   */
  // eslint-disable-next-line class-methods-use-this
  public configEntryChanged: (change: ChangeSet) => void = () => void 0;

  /**
   * load configs asynchronously
   *
   * @return {*}  {Promise<void>}
   * @memberof ConfigProvider
   */
  // eslint-disable-next-line class-methods-use-this
  public async load(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * gets a config value
   *
   * @param {string} key
   * @return {*}  {string}
   * @memberof ConfigProvider
   */
  public tryGet(key: string): string {
    return this.data[key];
  }

  /**
   * sets a config value
   *
   * @param {string} key
   * @param {any} value
   * @return {*}  {ChangeSet}
   * @memberof ConfigProvider
   */
  public set(key: string, value: any): ChangeSet {
    const changes: any = {
      path: key,
      value,
      type: undefined,
    };
    if (!this.data[key]) {
      changes.type = ChangeSetType.ADD;
    } else if (this.data[key] !== undefined && value === undefined) {
      changes.type = ChangeSetType.REMOVE;
    } else if (this.data[key] !== value) {
      changes.type = ChangeSetType.UPDATE;
    }
    if (this.data[key] === value) {
      changes.type = ChangeSetType.NONE;
    }
    this.data[key] = value;
    const changeSet = new ChangeSet(key, value, changes.type);
    if (changes.type !== ChangeSetType.NONE) {
      this.configEntryChanged(changeSet);
    }
    return changeSet;
  }

  /**
   * finish writing configs
   *
   * @param {ChangeSet[]} changes
   * @memberof ConfigProvider
   */
  public finish(changes: ChangeSet[]): void {
    const filtered = changes.filter((c) => c.type !== ChangeSetType.NONE);
    if (filtered.length > 0) {
      this.configWritten(filtered);
    }
  }
}

export default ConfigProvider;
