// eslint-disable-next-line max-classes-per-file
class InnerConfig {
  public bla: string = 'bla';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class InnerConfigEmpty {
}

export class MockConfig {
  public foo: string = 'bar';

  public bar: boolean = true;

  public count: number = 1;

  public cast: string = '1234';

  public inner: InnerConfig = new InnerConfig();

  public array: string[] = ['foo', 'bar'];

  public innerEmpty: InnerConfigEmpty = new InnerConfigEmpty();
}

export default MockConfig;
