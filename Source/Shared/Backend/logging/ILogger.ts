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