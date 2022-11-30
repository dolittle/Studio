// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { ToTextResponse } = require('@botchris/grpc-web-mock');

module.exports = {
    respondWith: (res, protobuf) => {
        const result = ToTextResponse(protobuf);
        res.set(result.headers)
            .status(result.statusCode)
            .send(result.body);
    }
}