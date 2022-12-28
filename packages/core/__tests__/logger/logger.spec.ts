import {
  createTemplate,
  format,
  Logger,
  LogLevel,
} from '../../src/index.js';
import MockTransport from '../__mocks__/mock-transport.js';

describe('logger', () => {
  it('should be defined', () => {
    expect(Logger).toBeDefined();
  });

  it('should be able to log', () => {
    const logger = new Logger();
    (logger as any).logInternal = jest.fn(() => undefined);

    logger.log('test');
    expect((logger as any).logInternal).toBeCalledWith(LogLevel.INFORMATION, 'test');
  });

  it('should be able to log with trace', () => {
    const logger = new Logger();
    (logger as any).logInternal = jest.fn(() => undefined);

    logger.trace('test');
    expect((logger as any).logInternal).toBeCalledWith(LogLevel.TRACE, 'test');
  });

  it('should be able to log with debug', () => {
    const logger = new Logger();
    (logger as any).logInternal = jest.fn(() => undefined);

    logger.debug('test');
    expect((logger as any).logInternal).toBeCalledWith(LogLevel.DEBUG, 'test');
  });

  it('should be able to log with info', () => {
    const logger = new Logger();
    (logger as any).logInternal = jest.fn(() => undefined);

    logger.info('test');
    expect((logger as any).logInternal).toBeCalledWith(LogLevel.INFORMATION, 'test');
  });

  it('should be able to log with warn', () => {
    const logger = new Logger();
    (logger as any).logInternal = jest.fn(() => undefined);

    logger.warn('test');
    expect((logger as any).logInternal).toBeCalledWith(LogLevel.WARNING, 'test');
  });

  it('should be able to log with error', () => {
    const logger = new Logger();
    (logger as any).logInternal = jest.fn(() => undefined);

    logger.error('test');
    expect((logger as any).logInternal).toBeCalledWith(LogLevel.ERROR, 'test');
  });

  it('should be able to log with critical', () => {
    const logger = new Logger();
    (logger as any).logInternal = jest.fn(() => undefined);

    logger.critical('test');
    expect((logger as any).logInternal).toBeCalledWith(LogLevel.CRITICAL, 'test');
  });

  it('should be able to log with custom transport', () => {
    const transport = new MockTransport({
      template: createTemplate(
        format.text('['),
        format.date(''),
        format.text(', '),
        format.pid(),
        format.text('] - '),
        format.level(),
        format.text(' - '),
        format.location(),
        format.text(': '),
        format.message(),
        format.newLine(),
      ),
    });
    transport.log = jest.fn(() => undefined);
    const logger = new Logger({
      transports: [
        transport,
      ],
    });
    logger.log('test');
    expect((transport.log as any).mock.calls.length).toBe(1);
  });

  it('should be able to log with custom transport and default config', () => {
    const transport = new MockTransport({});

    const logger = new Logger({
      transports: [
        transport,
      ],
    });
    transport.log = jest.fn(() => undefined);
    logger.log('test');
    expect((transport.log as any).mock.calls.length).toBe(1);
  });
});
