import fs from 'fs';
import readline from 'readline';
import yargs from 'yargs/yargs';
import { EventProducer } from '../eventsproducer';
interface ScriptArgs {
    inputFile: string;
}

const argv = <ScriptArgs>yargs(process.argv.slice(2)).options({
    inputFile: { type: 'string', demandOption: true, description: 'NDJSON file to produce events from' },
}).argv;

const inputFileReadStream = fs.createReadStream(argv.inputFile);
const rl = readline.createInterface(inputFileReadStream);
const eventProducer = new EventProducer();

rl.on('line', line => {
    const data = JSON.parse(line);
    const event = eventProducer.produce(data.payload);
    console.log(`${data.payload.document}: ${data.payload.operation}`, event);
});
