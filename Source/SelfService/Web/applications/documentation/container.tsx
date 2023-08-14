// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useNavigate, Routes } from 'react-router-dom';
import { Link } from '@fluentui/react';
import { HttpResponseApplication } from '../../apis/solutions/application';

import './documentation.scss';

import { useReadable } from 'use-svelte-store';
import { info, load, isLoaded } from '../stores/documentationInfo';
import { Doc as VerifyKubernetesAccess } from './verifyKubernetesAccess';
import { Doc as AccessContainerRegistry } from './accessContainerRegistry';
import { Doc as SetupAzurePipelines } from './cicd/setupAzurePipelines';
import { Typography } from '@mui/material';
import { RouteNotFound } from '../../components/notfound';

type Props = {
    application: HttpResponseApplication
};

export const DocumentationContainerScreen: React.FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;

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

    return (
        <>
            <div className="documentation">


                <Routes>
                    <Route path="/overview" element={
                        <ul >
                            <li>
                                <a href="#" onClick={(event) => {
                                    event.preventDefault();
                                    const href = `/documentation/application/${applicationId}/container-registry-info`;
                                    navigate(href);
                                }}>
                                    Container Registry Info
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(event) => {
                                    event.preventDefault();
                                    const href = `/documentation/application/${applicationId}/verify-kubernetes-access`;
                                    navigate(href);
                                }}>
                                    Verify access to kubernetes
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(event) => {
                                    event.preventDefault();
                                    const href = `/documentation/application/${applicationId}/ci-cd/azure-pipelines`;
                                    navigate(href);
                                }}>
                                    Setup Azure Pipelines
                                </a>
                            </li>
                        </ul>
                    } />

                    <Route path="/container-registry-info" element={
                        <>
                            <Link onClick={() => {
                                const href = `/documentation/application/${applicationId}/overview`;
                                navigate(href);
                            }}>
                                Back
                            </Link><Typography variant='h1' my={2}>Container Registry Info</Typography><AccessContainerRegistry info={$info} />
                        </>
                    } />

                    <Route path="/verify-kubernetes-access" element={
                        <>
                            <Link onClick={() => {
                                const href = `/documentation/application/${applicationId}/overview`;
                                navigate(href);
                            }}>
                                Back
                            </Link><Typography variant='h1' my={2}>Verify access to kubernetes</Typography><VerifyKubernetesAccess info={$info} />
                        </>
                    } />

                    <Route path="/ci-cd/azure-pipelines" element={
                        <>
                            <Link onClick={() => {
                                const href = `/documentation/application/${applicationId}/overview`;
                                navigate(href);
                            }}>
                                Back
                            </Link><Typography variant='h1' my={2}>Setup Azure Pipelines</Typography><SetupAzurePipelines info={$info} />
                        </>
                    } />

                    <Route element={<Typography variant='h1' my={2}>Something has gone wrong: documentation</Typography>} />

                    <Route path='*' element={<RouteNotFound redirectUrl='overview' auto={true} />} />
                </Routes>
            </div>
        </>
    );
};
