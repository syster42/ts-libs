import {
  Container,
  Runtime,
} from '../../src/index.js';

describe('runtime', () => {
  const container = new Container();
  it('should be defined', () => {
    expect(new Runtime(container)).toBeDefined();
  });

  it('should be able to start', async () => {
    const runtime = new Runtime(container);
    (runtime as any).startAsync = jest.fn(() => Promise.resolve());
    runtime.start();
    expect((runtime as any).startAsync.mock.calls.length).toBe(1);
  });

  it('should be able to stop', async () => {
    const runtime = new Runtime(container);
    (runtime as any).startAsync = jest.fn(() => Promise.resolve());
    runtime.start();
    expect((runtime as any).startAsync.mock.calls.length).toBe(1);
    const prom = new Promise<void>((resolve) => {
      (runtime as any).stopAsync = async (): Promise<void> => {
        (runtime as any).stoppedResolver();
        resolve();
        return Promise.resolve();
      };
    });
    await runtime.stop();
    expect(await prom).toBe(undefined);
  });

  it('should handle SIGINT', async () => {
    const runtime = new Runtime(container);
    (runtime as any).stopAsync = jest.fn(() => Promise.resolve());
    (process as any).emit('SIGINT');
    expect((runtime as any).stopAsync.mock.calls.length).toBe(1);
  });

  it('should handle SIGTERM', async () => {
    const runtime = new Runtime(container);
    (runtime as any).stopAsync = jest.fn(() => Promise.resolve());
    (process as any).emit('SIGTERM');
    expect((runtime as any).stopAsync.mock.calls.length).toBe(1);
  });

  it('should handle SIGQUIT', async () => {
    const runtime = new Runtime(container);
    (runtime as any).stopAsync = jest.fn(() => Promise.resolve());
    (process as any).emit('SIGQUIT');
    expect((runtime as any).stopAsync.mock.calls.length).toBe(1);
  });
});
