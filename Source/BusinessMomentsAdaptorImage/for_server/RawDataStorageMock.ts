// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IRawDataStorage } from '../RawDataStorage';

export class RawDataStorageMock implements IRawDataStorage {
    async Append(payload: any) {
    }

    GetById(id: string) {
        return Promise.resolve([]);
    }

    GetAll() {
        return Promise.resolve([]);
    }
}
