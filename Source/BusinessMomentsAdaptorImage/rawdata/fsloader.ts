// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import { EntityTransformer } from './processor';

export function loadSync(folder: string): EntityTransformer[] {
    // TODO: check if folder exist on fs
    let transformers: EntityTransformer[] = [];

    const transformersFolder = fs.readdirSync(folder);
    for (const fileName of transformersFolder) {
        const data = fs.readFileSync(`${folder}/${fileName}`);
        //const jsCode = ts.transpile(data.toString());
        // potentially unsafe to load this
        const transformer = eval(data.toString());
        transformers = transformers.concat([transformer]);
    }

    return transformers;
}
