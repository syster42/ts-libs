#core

Core framework for applications.

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
