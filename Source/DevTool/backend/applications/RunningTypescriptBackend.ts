// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import path from 'path';
import { exec, ChildProcess } from 'child_process';
import { Application, Microservice } from '@dolittle/vanir-common';
import { IRunningInstance } from './IRunningInstance';
import { PassThrough, Transform, TransformCallback } from 'stream';
import { ILogger } from '@dolittle/vanir-backend';


class Accumulated extends Transform {
    private _accumulator: any[] = [];

    constructor() {
        super();
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        this._accumulator.push(chunk);
        callback();
    }

    createStream() {
        const stream = new PassThrough();
        this._accumulator.forEach((chunk) => stream.write(chunk));
        return stream;
    }
}

export class RunningTypescriptBackend implements IRunningInstance {
    private _process?: ChildProcess;
    private _accumulated: Accumulated;

    constructor(directory: string, application: Application, microservice: Microservice, private readonly _logger: ILogger) {
        const backendDirectory = path.join(directory, 'Backend');

        _logger.info(`Starting backend at '${backendDirectory}'`);

        this._accumulated = new Accumulated();

        if (fs.existsSync(backendDirectory)) {
            this._process = exec('yarn start:dev', { cwd: backendDirectory });
            this._process.stdout?.setEncoding('utf8');
            this._process.stderr?.setEncoding('utf8');

            this._process.stdout?.pipe(this._accumulated);
            this._process.stderr?.pipe(this._accumulated);

            this._process.stdout?.pipe(process.stdout);
        }
    }

    async getLogs(): Promise<NodeJS.ReadableStream> {
        const stream = this._accumulated.createStream();
        return stream;
    }
}
