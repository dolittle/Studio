// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { InputMessages, OutputMessages } from './messages';
import { TerminalStreams } from './useConnect';

type Controller = TransformStreamDefaultController<OutputMessages>;

/**
 * Creates a fake TTY server that can be used for mocking a backend for the Terminal component.
 * @returns A set of {@link TerminalStreams} to interact with the fake server.
 */
export const createFakeServer = (): TerminalStreams => {
    let input = '';

    const prompt = (controller: Controller) => {
        controller.enqueue({ type: 'output', data: '$ ' });
    };

    const reset = (controller: Controller) => {
        input = '';
        controller.enqueue({ type: 'output', data: '\r\n' });
        prompt(controller);
    };

    const command = (controller: Controller) => {
        controller.enqueue({ type: 'output', data: '\r\n' });

        const args = input.split(' ').map(_ => _.trim()).filter(_ => _.length > 0);
        if (args.length > 0 && args[0].length > 0) {
            commands(controller, args[0], ...args.slice(1));
        }

        input = '';
        prompt(controller);
    };

    const server = new TransformStream<InputMessages, OutputMessages>({
        start(controller) {
            prompt(controller);
        },
        transform(message, controller) {
            if (message.type !== 'input') return;
            const chunk = message.data;

            switch (chunk) {
                case '\u0003': // Ctrl+C
                    controller.enqueue({ type: 'output', data: '^C' });
                    reset(controller);
                    break;
                case '\u0004': // Ctrl+D
                    controller.enqueue({ type: 'output', data: '\r\nexit' });
                    controller.terminate();
                    break;
                case '\r': // Enter
                    command(controller);
                    break;
                case '\u007F': // Backspace (DEL)
                    if (input.length > 0) {
                        input = input.substring(0, input.length - 1);
                        controller.enqueue({ type: 'output', data: '\b \b' });
                    }
                    break;
                default:
                    if (chunk >= String.fromCharCode(0x20) && chunk <= String.fromCharCode(0x7E) || chunk >= '\u00a0') {
                        input += chunk;
                        controller.enqueue({ type: 'output', data: chunk });
                    }
            }
        },
    });

    return { input: server.writable, output: server.readable };
};

const commands = (controller: Controller, command: string, ...args: string[]) => {
    const write = (data: string) => controller.enqueue({ type: 'output', data });
    const writeln = (line: string) => write(`${line}\r\n`);

    switch (command) {
        case 'help':
            writeln('No commands implemented yet. Come back later...');
            break;

        default:
            writeln(`Command '${command}' not found. Try running 'help'.`);
    }
};
