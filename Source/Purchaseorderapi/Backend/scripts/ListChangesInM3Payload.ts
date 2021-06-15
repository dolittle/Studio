import fs from 'fs';
import readline from 'readline';
import yargs from 'yargs/yargs';
interface ScriptArgs {
    inputFile: string;
    position: number;
}

const argv = <ScriptArgs>yargs(process.argv.slice(2)).options({
    inputFile: {
        type: 'string',
        demandOption: true,
        description: 'NDJSON file to read',
    },
    position: {
        type: 'number',
        demandOption: true,
        description: 'Position in NDJSON file'
    }
}).argv;

const inputFileReadStream = fs.createReadStream(argv.inputFile);
const rl = readline.createInterface(inputFileReadStream);

let position = 0;
rl.on('line', (line) => {
    const data = JSON.parse(line);
    if (position === argv.position) {
        var changeList: any = [];
        data.payload.elements.forEach((element) => {
            if (element.oldvalue !== element.newvalue) {
                changeList.push(`${element.name} (old: ${element.oldvalue}, new: ${element.newvalue})`);
            }
        });

        console.log(changeList);
    }
    position += 1;
});
