// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.



exports.queryRange = (query, from, to, limit, direction) => {
    return {
        status: 'success',
        data: {
            resultType: 'matrix',
            result: grouped.map((group) => ({
                stream: group[0],
                values: group[1].map((_) => [_[0].toString(), _[1]]),
            })),
            stats: {},
        },
    };
};
