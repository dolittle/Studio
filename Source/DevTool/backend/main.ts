// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { setMainWindow } from './globals';
import path from 'path';

import './dialogs/openDirectory';
import { Services } from './Services';
import { Interop } from './Interop';

let mainWindow: BrowserWindow | null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 1024,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true/*,
            enableRemoteModule: false,
            contextIsolation: true,
            sandbox: true*/
        }
    });

    setMainWindow(mainWindow);

    Services.initialize();
    Interop.initialize();

    const startURL = isDev ? 'http://localhost:9100' : `file://${path.join(__dirname, './build/index.html')}`;
    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow?.show());

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

