// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { dialog, ipcMain } from 'electron';
import { getMainWindow } from '../globals';

ipcMain.on('open-directory', async (event, arg) => {
    const mainWindow = getMainWindow();
    if (mainWindow) {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        });

        mainWindow.webContents.send('directory-opened', result.filePaths);
    }
});