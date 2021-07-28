// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';


type Props = {
    data: any
    filterBy: string
};

export const DumpJson: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const data = _props.data;
    const filterBy = _props.filterBy;
    let filtered = data;
    if (filterBy !== '*') {
        filtered = Object.keys(data)
            .filter((key) => key === filterBy)
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
    }

    return (
        <>
            <pre style={{ whiteSpace: 'pre' }}>
                {JSON.stringify(filtered, null, ' ')}
            </pre>
        </>
    );
};
