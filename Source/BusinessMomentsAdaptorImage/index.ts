// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//test comment
import { createServer, startServer } from './server';
import { MongodbRawDataStorage } from './RawDataStorage';

const rawDataStorage = new MongodbRawDataStorage();
// TODO: inject dependency with IoC in the future.
const app = createServer(rawDataStorage);
startServer(app);
