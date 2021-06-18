// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import readline from 'readline';
import yargs from 'yargs/yargs';
import { EventProducer } from '../eventsproducer';
interface ScriptArgs {
    inputFile: string;
}

const argv = <ScriptArgs>yargs(process.argv.slice(2)).options({
    inputFile: {
        type: 'string',
        demandOption: true,
        description: 'NDJSON file to produce events from',
    },
}).argv;

const inputFileReadStream = fs.createReadStream(argv.inputFile);
const rl = readline.createInterface(inputFileReadStream);
const eventProducer = new EventProducer();

let counter = 0;
rl.on('line', (line) => {
    const data = JSON.parse(line);
    const events = eventProducer.produce(data.payload);
    console.log(`${data.payload.document} (${counter}): ${data.payload.operation}`, events);
    counter += 1;
});
