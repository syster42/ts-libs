import { PromiseThrottle } from '../../src/index.js';

describe('helpers', () => {
  it('PromiseThrottle should be defined', () => {
    expect(PromiseThrottle).toBeDefined();
  });

  it('PromiseThrottle should be able to throttle', async () => {
    const throttle = new PromiseThrottle(2);
    const proms = [];
    for (let i = 0; i < 5; ++i) {
      proms.push(new Promise<void>((resolve) => {
        throttle.run(() => {
          resolve();
          return Promise.resolve();
        });
      }));
    }
    await expect(Promise.all(proms)).resolves.toBeDefined();
  });
});
