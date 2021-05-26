// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import { EntityTransformer } from './processor';
import path from 'path';

export function loadSync(folder: string): EntityTransformer[] {
    // TODO: check if folder exist on fs
    let transformers: EntityTransformer[] = [];

    const transformersFolder = fs.readdirSync(folder);
    for (const fileName of transformersFolder) {
        const filePath = `${folder}/${fileName}`;
        const fileStats = fs.lstatSync(filePath);
        if (!fileStats.isFile() &&
            !fileStats.isSymbolicLink()) {
            console.log('is not file or symlink', filePath);
            continue;
        }

        if (path.extname(filePath) !== '.js') {
            console.log('file extension is not .js');
            continue;
        }

        const data = fs.readFileSync(filePath);
        //const jsCode = ts.transpile(data.toString());
        // potentially unsafe to load this
        const transformer = eval(data.toString());
        transformers = transformers.concat([transformer]);
    }

    return transformers;
}
