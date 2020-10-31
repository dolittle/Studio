// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { LeveledLogMethod } from 'winston';

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