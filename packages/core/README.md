#core

This library aims to support the basic foundation for all micro-services. It provides a set of common interfaces and classes that can be used to build a micro-service.

## Installation

```bash
npm i --save @syster42/core
```

## Usage

```typescript
import { Application } from '@syster42/core';
const app = new Application();
await app.run(MainServiceClass, logger);
```

## Features

- Dependency Injection
- Application lifecycle
- Multi process support / clustering
- Configuration Management
- Logging with customizable transports

## Links

coming soon...

