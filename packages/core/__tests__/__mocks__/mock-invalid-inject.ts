import { Injectable } from '../../src/index.js';
import MockRecursiveInject from './mock-recursive-inject.js';

@Injectable()
export class MockInvalidInject {
  constructor(
    public recursive: MockRecursiveInject,
  ) {
  }
}

export default MockInvalidInject;
