// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { ipcMain } from 'electron';
import { Call, invokeServiceMethodEvent } from '../common';
import { getMainWindow } from './globals';

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
}