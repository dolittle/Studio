import fs from 'fs';
import readline from 'readline';

const x = fs.createReadStream('po-example.ndjson');

const rl = readline.createInterface(x);

rl.on('line', line => {
    const data = JSON.parse(line);
    console.log(`${data.payload.document}: ${data.payload.operation}`);
});
