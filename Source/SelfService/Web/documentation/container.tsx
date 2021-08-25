// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Link } from '@fluentui/react';
import { HttpResponseApplications2 } from '../api/api';


import './documentation.scss';

import { useReadable } from 'use-svelte-store';
import { info, load, isLoaded } from '../stores/documentationInfo';
import { Doc as VerifyKubernetesAccess } from './verifyKubernetesAccess';
import { Doc as AccessContainerRegistry } from './accessContainerRegistry';

type Props = {
    environment: string
    application: HttpResponseApplications2
};

export const DocumentationContainerScreen: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;
    const environment = _props.environment;

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
            setLoaded(true);
        }
    }, []);

    if (!loaded) {
        return null;
    }

    if ($info.applicationId === '') {
        return null;
    }

    const docProps = {
        application,
        info: $info,
    };
    return (
        <>
            <div className="documentation">


                <Switch>
                    <Route exact path="/documentation/application/:applicationId/:environment/overview" >
                        <ul >
                            <li>
                                <a href="#" onClick={(event) => {
                                    event.preventDefault();
                                    const href = `/documentation/application/${applicationId}/${environment}/container-registry-info`;
                                    history.push(href);
                                }}>
                                    Container Registry Info
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(event) => {
                                    event.preventDefault();
                                    const href = `/documentation/application/${applicationId}/${environment}/verify-kubernetes-access`;
                                    history.push(href);
                                }}>
                                    Verify access to kubernetes
                                </a>
                            </li>

                        </ul>
                    </Route>

                    <Route exact path="/documentation/application/:applicationId/:environment/container-registry-info">
                        <Link onClick={() => {
                            const href = `/documentation/application/${applicationId}/${environment}/overview`;
                            history.push(href);
                        }}>
                            Back
                        </Link>
                        <h1>Container Registry Info</h1>
                        <AccessContainerRegistry {...docProps} />
                    </Route>

                    <Route exact path="/documentation/application/:applicationId/:environment/verify-kubernetes-access">
                        <Link onClick={() => {
                            const href = `/documentation/application/${applicationId}/${environment}/overview`;
                            history.push(href);
                        }}>
                            Back
                        </Link>
                        <h1>Verify access to kubernetes</h1>
                        <VerifyKubernetesAccess {...docProps} />
                    </Route>

                    <Route>
                        <h1>Something has gone wrong: documentation</h1>
                    </Route>
                </Switch>
            </div>
        </>
    );
};
