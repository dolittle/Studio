// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AccumulatedStream } from './AccumulatedStream';
import { Writable } from 'stream';
import byline, { LineStream } from 'byline';
import { getMainWindow } from './globals';
import { ApplicationLogMessage, IApplicationLog } from '../common';


export class ApplicationLog implements IApplicationLog {
    private _stream = new AccumulatedStream();
    private count = 0;

    constructor() {
        this.wrapStream(process.stdout);
        this.wrapStream(process.stderr);

        this._stream.on('data', (chunk) => this.count += chunk.length);
    }

    async start(): Promise<void> {
        const mainWindow = getMainWindow();
        const stream = byline.createStream(this._stream.createStream());
        stream.on('data', (chunk) => mainWindow?.webContents.send(ApplicationLogMessage, chunk));
    }

    private wrapStream(stream: Writable) {
        const oldWrite = stream.write as any;
        const wrapper = (str: Uint8Array | string, encoding?: BufferEncoding, cb?: (err?: Error) => void): boolean => {
            this._stream.write(str);
            return oldWrite.call(stream, str, encoding, cb);
        };
        stream.write = wrapper.bind(this) as any;
    }
}
