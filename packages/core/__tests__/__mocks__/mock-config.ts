// eslint-disable-next-line max-classes-per-file
class InnerConfig {
  public bla = 'bla';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class InnerConfigEmpty {}

export class MockConfig {
  public foo = 'bar';

  public bar = true;

  public count = 1;

  public cast = '1234';

  public inner: InnerConfig = new InnerConfig();

  public array: string[] = ['foo', 'bar'];

  public innerEmpty: InnerConfigEmpty = new InnerConfigEmpty();
}

export default MockConfig;
