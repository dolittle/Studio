# Logging

The `@shared/backend` package is setup with a shared logging infrastructure. It leverages
[Winston](https://www.npmjs.com/package/winston) for logging. This is then configured to provide a
consistent logging experience both during development and when running in production.

## Express middleware logging

The Express Web Server has been set up using [Morgan](https://github.com/expressjs/morgan) to give logging
for all Web requests going into the exposed endpoints. This is set up and should show up in the different
environments.

## IoC Friendly

The logger can be taken as dependencies into constructors and the IoC will resolve it to the instance
configured.

```typescript
import { ILogger } from '@shared/backend/logging';

@injectable()
export class MySystem {
    constructor(private readonly _logger: ILogger) {
    }

    doStuff() {
        this._logger.info('This is a message');
    }
}
```

The `ILogger` interface just holds the capabilities of Winston and the different log levels:

```typescript
export abstract class ILogger {
    error!: LeveledLogMethod;
    warn!: LeveledLogMethod;
    help!: LeveledLogMethod;
    data!: LeveledLogMethod;
    info!: LeveledLogMethod;
    debug!: LeveledLogMethod;
    prompt!: LeveledLogMethod;
    http!: LeveledLogMethod;
    verbose!: LeveledLogMethod;
    input!: LeveledLogMethod;
    silly!: LeveledLogMethod;
}
```

## Non injected / Global logger

There is a global logger available for those scenarios where you can't take it in as a dependency.

```typescript
export { logger } from '@shared/backend';

logger.info('This is a message');
```
