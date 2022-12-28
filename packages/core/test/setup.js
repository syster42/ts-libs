/* eslint-disable no-console */
global.console = {
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  /*
  log: console.log,
  info: console.info, //* /
  debug: console.debug,
  error: console.error,
  warn: console.warn, */
};
