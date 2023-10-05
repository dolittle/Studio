// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Router } = require('express');
const { spawn } = require('node-pty');

const routes = module.exports = Router({ mergeParams: true });
require('express-ws')(routes);

routes.get('/token', (req, res) => {
    const { microserviceId } = req.params;
    if (microserviceId === '16965610-e419-40f1-b550-4841e93553b9') {
        console.warn('Simulating not-available shell for Goodbye microservice');
        res.status(404).end();
        return;
    }

    console.log('Getting Shell Proxy /token');
    res.status(200).json({ token: '' }).end();
})

routes.ws('/ws', (ws, req) => {
    console.log('Opened Shell Proxy /ws');

    const send = (command, data) => {
        ws.send(Buffer.from(command + data, 'utf8'));
    };
    const write = (data) => {
        send('0', data);
    };
    const setTitle = (title) => {
        send('1', title);
    };
    const setPreferences = (preferences) => {
        send('2', JSON.stringify(preferences));
    };

    const initialMesssageHandler = (msg) => {
        ws.off('message', initialMesssageHandler);
        try {
            const { AuthToken: token, columns, rows } = JSON.parse(msg.toString('utf8'));
            setTitle('Mock Terminal');
            setPreferences({});

            console.log('Shell proxy: Spawning shell');

            // Initiate the real shell
            const shell = spawn('bash', [], {
                name: 'xterm-256color',
                cols: columns,
                rows,
                cwd: process.env.HOME,
                env: process.env,
            });

            write('\x1b[31mTHIS IS A REAL SHELL ON YOUR MACHINE, DONT MESS ABOUT!!\033[0m\r\n\n');

            shell.on('data', write);
            shell.on('exit', (exitCode, signal) => {
                if (exitCode === 0) {
                    console.log('Shell proxy: Normal exit');
                    ws.close(1000);
                    return;
                }
                console.error('Shell proxy: Non-normal exit');
                ws.close(3100);
            });

            ws.on('message', (msg) => {
                const str = msg.toString('utf8');
                const command = str.slice(0, 1);
                const data = str.slice(1);

                try {
                    switch (command) {
                        case '0':
                            shell.write(data);
                            break;
                        case '1':
                            const { columns, rows } = JSON.parse(data);
                            shell.resize(columns, rows);
                            break;
                        case '2':
                            shell.pause();
                            break;
                        case '3':
                            shell.resume();
                            break;
                        default:
                            throw new Error(`Unexpected command ${command}`);
                    }
                } catch (err) {
                    console.error('Shell proxy: Failed to handle message');
                    ws.close(3101);
                }
            });

            ws.on('close', (code, reason) => {
                console.log('Shell proxy: socket close', code, reason.toString('utf8'));
                shell.kill();
            });

            ws.on('error', () => {
                console.error('Shell proxy: error');
                shell.kill();
            });
        } catch (err) {
            console.error('Shell proxy: Failed to parse initial message');
            ws.close(3102);
        }
    };
    ws.on('message', initialMesssageHandler);
});
