/* eslint-disable no-underscore-dangle */

import { Controller, controller } from '../src/index.js';
import MockController from './__mocks__/mock-controller.js';

describe('decorators', () => {
  it('should add prefix to controller', () => {
    controller('/test')(Controller);
    expect(Controller.prototype.__prefix()).toBe('/test');
  });

  it('should add method to controller', () => {
    const ctrl = new MockController();
    const annotations = ctrl.__annotations.get('test')!;
    expect(annotations[0].name).toBe('httpMethod');
    expect(annotations[0].args[0]).toBe('put');
  });

  it('should add route to controller', () => {
    const ctrl = new MockController();
    const annotations = ctrl.__annotations.get('test2')!;
    expect(annotations[0].name).toBe('route');
    expect(annotations[0].args[0]).toBe('route');
    expect(annotations[1].name).toBe('httpMethod');
    expect(annotations[1].args[0]).toBe('post');
  });

  it('should add accepts to endpoint', () => {
    const ctrl = new MockController();
    const annotations = ctrl.__annotations.get('patch')!;
    expect(annotations[0].name).toBe('accepts');
    expect(annotations[0].args[0]).toBe('application/json');
  });
});
