// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Link } from '@fluentui/react';

export const BusinessMomentsOverview: React.FunctionComponent = () => {
    const history = useHistory();
    const { environment, applicationId } = useParams() as any;

    return (
        <>
            <h1>Business moments</h1>
            <ul>
                <li>
                    <Link onClick={() => {
                        // This is annoying as balls
                        const href = `/application/${applicationId}/${environment}/business-moments/editor/fake-123`;
                        history.push(href);
                    }}>
                        Fake moment in time
                    </Link>
                </li>

            </ul>
        </>
    );
};
