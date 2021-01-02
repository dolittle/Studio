// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PassThrough, Transform, TransformCallback } from 'stream';
import { Guid } from '@dolittle/rudiments';

type ChunkCallback = (chunk: Uint8Array|string) => void;

export class AccumulatedStream extends Transform {
    private _accumulator: any[] = [];
    private _appendListeners: {[key: string]: ChunkCallback} = {};

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
        const listener = this.onAppend((chunk) => stream.write(chunk));
        stream.on('close', () => {
            this.removeAppendListener(listener);
        });
        return stream;
    }

    onAppend(callback: ChunkCallback) {
        const id = Guid.create().toString();
        this._appendListeners[id] = callback;
        return id;
    }

    removeAppendListener(id: string) {
        delete this._appendListeners[id];
    }

    removeAllAppendListeners() {
        this._appendListeners = {};
    }

    append(chunk: Uint8Array | string) {
        this._accumulator.push(chunk);
        for (const listener in this._appendListeners) {
            this._appendListeners[listener](chunk);
        }
    }

    getLength() {
        return this._accumulator.length;
    }

    getContent() {
        return this._accumulator;
    }
}
