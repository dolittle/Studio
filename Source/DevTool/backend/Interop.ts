// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container, singleton } from 'tsyringe';
import { ipcMain } from 'electron';
import { Call, invokeServiceMethodEvent } from '../common';
import { getMainWindow } from './globals';

@singleton()
export class Interop {
    static initialize() {
        ipcMain.on(invokeServiceMethodEvent, async (event, arg: any[]) => {
            if (arg.length === 1) {
                const call = arg[0] as Call;
                const service = container.resolve(call.service) as any;
                const result = await service[call.method].call(service, ...call.args);
                const mainWindow = getMainWindow();
                mainWindow?.webContents.send(call.responseEventName, result);
            }
        });
    }

    async invoke(service: string, method: string, ...args: any[]): Promise<any> {
        const mainWindow = getMainWindow();
        return new Promise(resolve => {
            const call = new Call(service, method, args);
            mainWindow?.webContents.send(invokeServiceMethodEvent, [call]);
            const listener = (event, message) => {
                resolve(message);
                ipcMain.removeListener(call.responseEventName, listener);
                ipcMain.removeHandler(call.responseEventName);
            };
            ipcMain.on(call.responseEventName, listener);
        });
    }
}
