import { Inject, Injectable } from '../../src/index.js';
import InjectionToken from '../../src/ioc/injection-token.js';

export const mockFactoryInject = (): string => 'test';
export const mockFactoryInjectToken = new InjectionToken('factoryInject');

@Injectable()
export class MockFactoryInjectClass {
  constructor(@Inject(mockFactoryInjectToken) public inject: string) {}
}
