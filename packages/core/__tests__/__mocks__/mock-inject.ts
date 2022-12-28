import {
  Container,
  Inject,
  Parent,
  Root,
  Singleton,
} from '../../src/index.js';
import InjectionToken from '../../src/ioc/injection-token.js';

export const MockValueInjector = new InjectionToken('MockValueInjector');

@Singleton()
export class MockInjectClass {
  constructor(
    @Root() public root: Container,
    @Parent() public parent: Container,
    @Inject(MockValueInjector) public inject: string,
  ) {

  }
}

export default MockInjectClass;
