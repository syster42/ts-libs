import LogLevel from '../../enums/log-level.js';
import Formatter from '../../types/formatter.js';

/**
 * format logging string
 * @type {*}
 */
export const format = {
  date:
    (_fmt?: string): Formatter =>
    ({ date }: { date: Date }): string =>
      date.toISOString(),
  level:
    (): Formatter =>
    ({ level }: { level: LogLevel }): string =>
      LogLevel[level],
  location:
    (): Formatter =>
    ({ location }: { location: string }): string =>
      location,
  message:
    (): Formatter =>
    ({ message }: { message: string }): string =>
      message,
  text:
    (text: string): Formatter =>
    (): string =>
      text,
  newLine: (): Formatter => (): string => '\n',
  pid: (): Formatter => (): string => `${process.pid}`,
};

export default format;
