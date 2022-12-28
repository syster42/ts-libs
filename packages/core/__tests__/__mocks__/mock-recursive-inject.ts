import { Injectable } from '../../src/index.js';
import MockInvalidInject from './mock-invalid-inject.js';

@Injectable()
export class MockRecursiveInject {
  constructor(public recursive: MockInvalidInject) {}
}

export default MockRecursiveInject;
