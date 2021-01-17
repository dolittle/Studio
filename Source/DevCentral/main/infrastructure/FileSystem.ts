// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';

import { BaseEncodingOptions, MakeDirectoryOptions, PathLike } from 'original-fs';
import { FileHandle } from 'fs/promises';
import { URL } from 'url';
import { IFileSystem } from './IFileSystem';

export class FileSystem implements IFileSystem {
    exists(path: PathLike): boolean {
        return fs.existsSync(path);
    }

    mkdir(path: PathLike, options?: string | number | (MakeDirectoryOptions & { recursive?: false | undefined; }) | null): void {
        return fs.mkdirSync(path, options);
    }

    readFile(path: string | Buffer | URL | FileHandle, options?: { encoding?: null | undefined; flag?: string | number | undefined; } | null): Promise<Buffer> {
        return fs.promises.readFile(path, options);
    }

    writeFile(path: string | Buffer | URL | FileHandle, data: string | Uint8Array, options?: (BaseEncodingOptions & { mode?: string | number | undefined; flag?: string | number | undefined; }) | 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex' | null): Promise<void> {
        return fs.promises.writeFile(path, data, options);
    }
}
