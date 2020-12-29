// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const ipcRenderer = window.require('electron').ipcRenderer;

import { invokeServiceMethodEvent, Call } from '../common';
export class Interop {
    async invoke(service: string, method: string, ...args: any[]): Promise<any> {
        return new Promise(resolve => {
            const call = new Call(service, method, args);
            ipcRenderer.send(invokeServiceMethodEvent, [call]);

            ipcRenderer.on(call.responseEventName, (event, message) => {
                resolve(message);
            });
        });
    }
}