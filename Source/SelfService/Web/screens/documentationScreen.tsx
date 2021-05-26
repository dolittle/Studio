// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Link } from '@fluentui/react';

export const DocumentationScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { environment, applicationId } = useParams() as any;

    return (
        <>
            <ul>
                <li>
                    <Link onClick={() => {
                        // This is annoying as balls
                        const href = `/application/${applicationId}/${environment}/documentation/container-registry-info`;
                        history.push(href);
                    }}>
                        Show Container Registry Info
                    </Link>
                </li>

            </ul>
        </>
    );
};
