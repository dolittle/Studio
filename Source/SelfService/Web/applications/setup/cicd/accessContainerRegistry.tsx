// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Box, Paper } from '@mui/material';

import { BadgeWithTitle, LoadingSpinner, PreformattedTextBlock } from '@dolittle/design-system';

import { Info } from '../../stores/documentationInfo';

import { getContainerRegistry } from '../../../apis/solutions/cicd';

export type DockerCredentials = {
    repoUrl: string;
};

export type Vars = {
    acrId: string;
    subscriptionId: string;
    dockerCredentials: DockerCredentials;
};

export type AccessContainerRegistryProps = {
    info: Info;
};

export const AccessContainerRegistry = ({ info }: AccessContainerRegistryProps) => {
    const [containerRegistry, setContainerRegistry] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getContainerRegistry(info.applicationId)])
            .then(values => setContainerRegistry(values[0]))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <LoadingSpinner />;

    const auths = JSON.parse(atob(containerRegistry['.dockerconfigjson'])).auths;
    // Not great, but only one key for now
    const repoUrl = Object.keys(auths)[0];
    const credentials = auths[repoUrl] as DockerCredentials;
    credentials.repoUrl = repoUrl;

    const vars = {
        acrId: info.containerRegistryName,
        subscriptionId: info.subscriptionId,
        dockerCredentials: credentials
    } as Vars;

    return (
        <Paper sx={{ p: 2 }}>
            <Box sx={{ mt: 1, mb: 3 }}>
                <BadgeWithTitle number={1} title='Login to Azure' />
                <PreformattedTextBlock text={`az login`} />
            </Box>

            <Box sx={{ mb: 3 }}>
                <BadgeWithTitle number={2} title='Login to your registry' />
                <PreformattedTextBlock text={`az acr login -n ${vars.acrId} --subscription ${vars.subscriptionId}`} />
            </Box>

            <Box sx={{ mb: 3 }}>
                <BadgeWithTitle number={3} title='List images in acr' />
                <PreformattedTextBlock text={`az acr repository list --name ${vars.acrId} -otable`} />
            </Box>

            <Box>
                <BadgeWithTitle number={4} title='Push images' />
                <PreformattedTextBlock text={`# pull down your example of choice
# golang hello world
git clone git@github.com:dolittle-entropy/go-hello-world

# build go-hello-world docker image
docker build -t go-hello-world .

# tag the image with the url to container registry
docker tag go-hello-world:latest ${vars.dockerCredentials.repoUrl}/go-hello-world:latest

# push the image to container registry
docker push ${vars.dockerCredentials.repoUrl}/go-hello-world:latest`} />
            </Box>
        </Paper>
    );
};
