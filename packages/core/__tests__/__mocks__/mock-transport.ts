import { LogLevel, Transport } from '../../src/index.js';

export class MockTransport extends Transport {
  public testMessage = '';

  public testLevel: LogLevel = LogLevel.INFORMATION;

  public log({ message, level }: { message: string; level: LogLevel }): void {
    this.testMessage = this.format(message);
    this.testLevel = level;
  }
}

export default MockTransport;
