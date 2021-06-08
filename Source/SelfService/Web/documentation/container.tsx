// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useParams, useHistory } from 'react-router-dom';
import { Link } from '@fluentui/react';
import { HttpResponseApplications2 } from '../api/api';


import { useReadable } from 'use-svelte-store';
import { info, load, isLoaded } from '../stores/documentationInfo';
import { ContainerRegistryInfoScreen } from './containerRegistryInfoScreen';

type Props = {
    application: HttpResponseApplications2
};

export const DocumentationContainerScreen: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const { environment, applicationId } = useParams() as any;
    const $info = useReadable(info) as any;
    const $isLoaded = useReadable(isLoaded) as boolean;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!$isLoaded) {
            Promise.all([
                load(applicationId),
            ]).then(values => {
                setLoaded(true);
            });
        } else {
            console.log('Business moments data already loaded');
            setLoaded(true);
        }

    }, []);

    if (!loaded) {
        return null;
    }

    if ($info.applicationId === '') {
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

            <Route exact path="/application/:applicationId/:environment/documentation/container-registry-info">
                <ContainerRegistryInfoScreen application={application} info={$info} />
            </Route>
        </>
    );
};
