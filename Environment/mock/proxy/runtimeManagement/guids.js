// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Uuid } = require('@dolittle/contracts.web/Protobuf/Uuid_pb');
const { Guid } = require('@dolittle/rudiments');

module.exports = {
    toUuid: (guidString) => {
        const uuid = new Uuid();
        uuid.setValue(new Uint8Array(Guid.parse(guidString).bytes));
        return uuid;
    }
}