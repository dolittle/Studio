import fs from 'fs';
import readline from 'readline';
import yargs from 'yargs/yargs';
interface ScriptArgs {
    inputFile: string;
}

const argv = <ScriptArgs>yargs(process.argv.slice(2)).options({
    inputFile: { type: 'string', demandOption: true, description: 'NDJSON file to produce events from' },
}).argv;

const x = fs.createReadStream(argv.inputFile);
const rl = readline.createInterface(x);

rl.on('line', line => {
    const data = JSON.parse(line);
    console.log(`${data.payload.document}: ${data.payload.operation}`);
});
