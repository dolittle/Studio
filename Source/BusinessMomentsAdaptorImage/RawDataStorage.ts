// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import rawData from './dataschema';

export abstract class IRawDataStorage {
    abstract Append(payload: any): Promise<void>;
    abstract GetById(id: string): Promise<any | null>;
    abstract GetAll(): Promise<any[]>;
}

export class MongodbRawDataStorage implements IRawDataStorage {

    async Append(payload: any) {
        const data = new rawData(payload);
        await data.save();
    }

    GetById(id: string) {
        return rawData.findById(id).exec();
    }

    GetAll() {
        return rawData.find().exec();
    }

}
