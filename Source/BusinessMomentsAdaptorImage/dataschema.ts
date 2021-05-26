// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import mongoose from 'mongoose';
// const uri: string = 'mongodb://127.0.0.1:27017/local';
const uri: any = process.env.mongodb_uri;

mongoose.connect(uri, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Successfully Connected to MongoDB!');
    }
});

const rawData = mongoose.model(
    'rawData',
    new mongoose.Schema(
        {
            any: {},
            expireAt: { type: Date, index: { expires: '288h' }, default: Date.now },
        },
        { strict: false }
    )
);

export default rawData;
