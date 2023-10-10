// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Badge, Box, Paper, Typography } from '@mui/material';

import { Info } from '../../stores/documentationInfo';

import { getContainerRegistry } from '../../../apis/solutions/cicd';

// TODO: Move to DesignSystem
type BadgeWithTitleProps = {
    number: number;
    text: string;
};

// TODO: Move to DesignSystem
const BadgeWithText = ({ number, text }: BadgeWithTitleProps) =>
    <Box sx={{ display: 'flex' }}>
        <Badge badgeContent={number} color='primary' sx={{ top: '12px', mr: 3, ml: 1 }} />
        <Typography variant='subtitle1'>{text}</Typography>
    </Box>;

// TODO: Move to DesignSystem
type PreformattedTextBlockProps = {
    text: string;
};

// TODO: Move to DesignSystem
const PreformattedTextBlock = ({ text }: PreformattedTextBlockProps) =>
    <Box sx={{ color: 'text.secondary', fontSize: 14, ml: 4 }}>
        <pre style={{ margin: '8px 0' }}>{text}</pre>
    </Box>;

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
    const [loaded, setLoaded] = useState(false);
    const [containerRegistry, setContainerRegistry] = useState({});

    useEffect(() => {
        Promise.all([getContainerRegistry(info.applicationId)])
            .then(values => {
                setContainerRegistry(values[0]);
                setLoaded(true);
            });
    }, []);

    if (!loaded) return null;

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
            <Box sx={{ mb: 3 }}>
                <BadgeWithText number={1} text='Login to Azure' />
                <PreformattedTextBlock text={`az login`} />
            </Box>

            <Box sx={{ mb: 3 }}>
                <BadgeWithText number={2} text='Login to your registry' />
                <PreformattedTextBlock text={`az acr login -n ${vars.acrId} --subscription ${vars.subscriptionId}`} />
            </Box>

            <Box sx={{ mb: 3 }}>
                <BadgeWithText number={3} text='List images in acr' />
                <PreformattedTextBlock text={`az acr repository list --name ${vars.acrId} -otable`} />
            </Box>

            <Box>
                <BadgeWithText number={4} text='Push images' />
                <PreformattedTextBlock text={`# pull down your example of choice
# golang hello world
git clone git@github.com:dolittle-entropy/go-hello-world

# build go-hello-world docker image
docker build -t go-hello-world .

# tag the image with the url to container registry
docker tag go-hello-world:latest ${vars.dockerCredentials.repoUrl}/go-hello-world:latest

# push the image to container registry
docker push ${vars.dockerCredentials.repoUrl} /go-hello-world:latest`} />
            </Box>
        </Paper>
    );
};
