// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import { HttpResponseApplication } from '../api/application';

import { View as Tags } from './tags';
import { View as Images } from './images';
import { View as Welcome } from './welcome';

import { getReposInContainerRegistry, ContainerRegistryImages } from '../api/containerregistry';

type Props = {
    environment: string
    application: HttpResponseApplication
};

export const ContainerRegistryContainer: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;
    const environment = _props.environment;

    const [loaded, setLoaded] = useState(false);
    const [containerRegistryImages, setContainerRegistryImages] = useState({
        url: '',
        images: [],
    } as ContainerRegistryImages);

    useEffect(() => {
        Promise.all([
            getReposInContainerRegistry(applicationId)
        ]).then(values => {
            setContainerRegistryImages(values[0]);
            setLoaded(true);
        });
    }, []);


    if (!loaded) {
        return null;
    }


    const hasImages = containerRegistryImages.images.length > 0;


    // Force redirect if no images to the welcome screen
    if (!hasImages && !window.location.pathname.endsWith('/overview/welcome')) {
        const href = `/containerregistry/application/${applicationId}/${environment}/overview/welcome`;
        history.push(href);
        return null;
    }

    return (
        <>
            <div>
                <h1>Container Registry</h1>
            </div>

            <div>
                <Switch>
                    <Route exact path="/containerregistry/application/:applicationId/:environment/overview/welcome" >
                        <Welcome applicationId={applicationId} />
                    </Route>

                    <Route exact path="/containerregistry/application/:applicationId/:environment/overview" >
                        <Images applicationId={applicationId} environment={environment} data={containerRegistryImages} />
                    </Route>
                    <Route path="/containerregistry/application/:applicationId/:environment/overview/tags/:image+">
                        <Tags url={containerRegistryImages.url} applicationId={applicationId} />
                    </Route>
                </Switch>
            </div>
        </>
    );
};
