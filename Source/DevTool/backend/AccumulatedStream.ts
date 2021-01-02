// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PassThrough, Transform, TransformCallback } from 'stream';

export class AccumulatedStream extends Transform {
    private _accumulator: any[] = [];

    constructor() {
        super();
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        this.append(chunk);
        callback();
    }

    createStream() {
        const stream = new PassThrough();
        this._accumulator.forEach((chunk) => stream.write(chunk));
        return stream;
    }

    append(chunk: Uint8Array | string) {
        this._accumulator.push(chunk);
    }

    getLength() {
        return this._accumulator.length;
    }

    getContent() {
        return this._accumulator;
    }
}
