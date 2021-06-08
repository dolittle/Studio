// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Link } from '@fluentui/react';
import { getPersonalisedInfo } from '../api/application';

export const DocumentationScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { environment, applicationId } = useParams() as any;
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        Promise.all([
            getPersonalisedInfo(applicationId),
        ]).then(values => {
            const info = values[0] as any;
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }

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
