import { Container, Ctor, INJECTION_SCOPE, InjectionScope, Logger, Parent, Singleton } from '@syster42/core';
import Provider from './provider.js';

@Singleton()
export class ProviderRegistry {
  private static instance: ProviderRegistry;

  private readonly providers: Map<string, Provider>;

  private readonly container: Container;

  constructor(private readonly logger: Logger, @Parent() private readonly parent: Container) {
    if (ProviderRegistry.instance) {
      throw new Error('ProviderRegistry is a singleton');
    }
    ProviderRegistry.instance = this;

    this.container = new Container({
      name: 'auth-provider-container',
      parent: this.parent,
    });

    this.providers = new Map();
  }

  public static register(provider: Ctor<Provider>): void {
    if (Reflect.getMetadata(INJECTION_SCOPE, provider) !== InjectionScope.SINGLETON) {
      throw new Error(`Provider ${provider.name} must be @Singleton()`);
    }

    ProviderRegistry.instance.register(provider);
  }

  public types(): string[] {
    return Array.from(this.providers.keys());
  }

  public get(type: string): Provider | undefined {
    return this.providers.get(type);
  }

  private register(provider: Ctor<Provider>): void {
    if (this.container.getProviderMap().has(provider)) {
      throw new Error(`Provider ${provider.constructor.name} already registered`);
    }

    const injected = this.container
      .addProvider({
        provide: provider,
        class: provider,
      })
      .inject(provider);

    if (this.providers.has(injected.type)) {
      throw new Error(`Provider ${injected.type} already registered`);
    }
    this.providers.set(injected.type, injected);

    this.logger.debug(`Registered auth provider ${injected.type}`);
  }
}

export default ProviderRegistry;
