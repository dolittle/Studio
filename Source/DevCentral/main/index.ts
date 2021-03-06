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

import * as DependencyInversion from '@dolittle/vanir-dependency-inversion';
import { DockerEnvironment } from './DockerEnvironment';

import { Globals as AppCreationGlobal } from 'create-dolittle-app/dist/Globals';
import { Config as AppCreationConfig } from 'create-dolittle-app/dist/Config';
import { Globals as MicroserviceCreationGlobal } from 'create-dolittle-microservice/dist/Globals';
import { Config as MicroserviceCreationConfig } from 'create-dolittle-microservice/dist/Config';
import { logger } from '@dolittle/vanir-backend';
import shellPath from 'shell-path';
import { Configuration as Infrastructure } from './infrastructure/Configuration';
import { Bindings as WorkspacesBindings } from './workspaces/Bindings';

let mainWindow: BrowserWindow | null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

function fixPath() {
    if (process.platform !== 'darwin') {
        return;
    }

    process.env.PATH = shellPath.sync() || [
        './node_modules/.bin',
        '/.nodebrew/current/bin',
        '/usr/local/bin',
        process.env.PATH
    ].join(':');
};

function createWindow() {
    fixPath();

    const windowConfig: any = {
        width: 1000,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: false,
            contextIsolation: false,
            sandbox: false,
            webSecurity: false
        },
        titleBarStyle: 'hidden',
        darkTheme: true
    };

    if (process.platform === 'darwin') {
        windowConfig.vibrancy = 'dark';
        windowConfig.frame = false;
    } else {
        windowConfig.backgroundColor = '#333';
    }

    // Create the browser window.
    mainWindow = new BrowserWindow(windowConfig);
    mainWindow.setMenuBarVisibility(false);
    setMainWindow(mainWindow);

    DependencyInversion.initialize();
    Infrastructure.configure();
    Services.initialize();
    DockerEnvironment.initialize();
    Interop.initialize();
    WorkspacesBindings.initialize();

    if (isDev) {
        mainWindow.loadURL('http://localhost:9100');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile('./build/index.html');
    }

    AppCreationGlobal.version = '8.0.4';
    AppCreationConfig.templatesRootPath = path.resolve(path.join(app.getAppPath(), 'templates', 'app'));
    MicroserviceCreationGlobal.version = '8.0.4';
    MicroserviceCreationConfig.templatesRootPath = path.resolve(path.join(app.getAppPath(), 'templates', 'microservice'));

    logger.info(`App templates are located at : '${AppCreationConfig.templatesRootPath}'`);
    logger.info(`Microservice templates are located at : '${AppCreationConfig.templatesRootPath}'`);


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
