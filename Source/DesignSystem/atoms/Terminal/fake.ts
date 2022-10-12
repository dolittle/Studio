// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

type Controller = TransformStreamDefaultController<string>;

export const createFakeServer = (): TransformStream<string, string> => {
    let input = '';

    const prompt = (controller: Controller) => {
        controller.enqueue('$ ');
    };

    const reset = (controller: Controller) => {
        input = '';
        controller.enqueue('\r\n');
        prompt(controller);
    };

    const command = (controller: Controller) => {
        controller.enqueue('\r\n');

        const args = input.split(' ').map(_ => _.trim()).filter(_ => _.length > 0);
        if (args.length > 0 && args[0].length > 0) {
            commands(controller, args[0], ...args.slice(1));
        }

        input = '';
        prompt(controller);
    };

    return new TransformStream<string, string>({
        start(controller) {
            prompt(controller);
        },
        transform(chunk, controller) {
            switch (chunk) {
                case '\u0003': // Ctrl+C
                    controller.enqueue('^C');
                    reset(controller);
                    break;
                case '\r': // Enter
                    command(controller);
                    break;
                case '\u007F': // Backspace (DEL)
                    if (input.length > 0) {
                        input = input.substring(0, input.length-1);
                        controller.enqueue('\b \b');
                    }
                    break;
                default:
                    if (chunk >= String.fromCharCode(0x20) && chunk <= String.fromCharCode(0x7E) || chunk >= '\u00a0') {
                        input += chunk;
                        controller.enqueue(chunk);
                    }
            }
        },
    });
};

const commands = (controller: Controller, command: string, ...args: string[]) => {
    const write = (data: string) => controller.enqueue(data);
    const writeln = (line: string) => write(`${line}\r\n`);

    switch (command) {
        case 'help':
            writeln('No commands implemented yet. Come back later...');
            break;

        default:
            writeln(`Command '${command}' not found. Try running 'help'.`);
    }
};
