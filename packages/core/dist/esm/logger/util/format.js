import LogLevel from '../../enums/log-level.js';
/**
 * format logging string
 * @type {*}
 */
export const format = {
    date: (_fmt) => ({ date }) => date.toISOString(),
    level: () => ({ level }) => LogLevel[level],
    location: () => ({ location }) => location,
    message: () => ({ message }) => message,
    text: (text) => () => text,
    newLine: () => () => '\n',
    pid: () => () => `${process.pid}`,
};
export default format;
