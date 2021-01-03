// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const ipcRenderer = window.require('electron').ipcRenderer;

import { invokeServiceMethodEvent, Call } from '../common';
import { singleton, container } from 'tsyringe';

@singleton()
export class Interop {
    static initialize() {
        ipcRenderer.on(invokeServiceMethodEvent, async (event, arg: any[]) => {
            if (arg.length === 1) {
                const call = arg[0] as Call;
                const service = container.resolve(call.service) as any;
                const result = await service[call.method].call(service, ...call.args);
                ipcRenderer.send(call.responseEventName, result);
            }
        });
    }

    async invoke(service: string, method: string, ...args: any[]): Promise<any> {
        return new Promise(resolve => {
            const call = new Call(service, method, args);
            ipcRenderer.send(invokeServiceMethodEvent, [call]);
            const listener = (event, message) => {
                resolve(message);
                ipcRenderer.removeListener(call.responseEventName, listener);
            };
            ipcRenderer.on(call.responseEventName, listener);
        });
    }
}
