// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BaseEncodingOptions, MakeDirectoryOptions, Mode, PathLike } from 'original-fs';
import { FileHandle } from 'fs/promises';
import { OpenMode } from 'fs';

export abstract class IFileSystem {
    abstract exists(path: PathLike): boolean;
    abstract mkdir(path: PathLike, options?: Mode | (MakeDirectoryOptions & { recursive?: false; }) | null): void;
    abstract readFile(path: PathLike | FileHandle, options?: { encoding?: null, flag?: OpenMode } | BufferEncoding | null): Promise<string | Buffer>;
    abstract writeFile(path: PathLike | FileHandle, data: string | Uint8Array, options?: BaseEncodingOptions & { mode?: Mode, flag?: OpenMode } | BufferEncoding | null): Promise<void>;
}
