// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';

import gfm from 'remark-gfm';

import { Badge, Box, Paper, Typography } from '@mui/material';

import { Info } from '../../stores/documentationInfo';

import { getContainerRegistry } from '../../../apis/solutions/cicd';

export type DockerCredentials = {
    repoUrl: string
};

export type Vars = {
    acrId: string;
    subscriptionId: string;
    dockerCredentials: DockerCredentials;
};

function template(vars: Vars): string {
    const markdown = `
# Login to az

~~~sh
az login
~~~

# Login to your registry
~~~sh
az acr login -n ${vars.acrId} --subscription ${vars.subscriptionId}
~~~


# List images in acr
~~~sh
az acr repository list --name ${vars.acrId} -otable
~~~


# Push images
~~~sh
# pull down your exmaple of choice
# golang hello world
git clone git@github.com:dolittle-entropy/go-hello-world

# build go-hello-world docker image
docker build -t go-hello-world .

# tag the image with the url to container registry
docker tag go-hello-world:latest ${vars.dockerCredentials.repoUrl}/go-hello-world:latest

# push the image to container registry
docker push ${vars.dockerCredentials.repoUrl}/go-hello-world:latest
~~~

`;
    return markdown.trim();
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

    const data = template(vars);

    return (
        <Paper sx={{ p: 2 }}>
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Badge badgeContent='1' color='primary' sx={{ top: '12px', mr: 3, ml: 1 }} />
                    <Typography variant='subtitle1'>Login to Azure</Typography>
                </Box>

                <Box sx={{ color: 'text.secondary', fontSize: 14, ml: 4 }}>
                    <code>az login</code>
                </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Badge badgeContent='2' color='primary' sx={{ top: '12px', mr: 3, ml: 1 }} />
                    <Typography variant='subtitle1'>Login to your registry</Typography>
                </Box>

                <Box sx={{ color: 'text.secondary', fontSize: 14, ml: 4 }}>
                    <code>{`az acr login -n ${vars.acrId} --subscription ${vars.subscriptionId}`}</code>
                </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Badge badgeContent='3' color='primary' sx={{ top: '12px', mr: 3, ml: 1 }} />
                    <Typography variant='subtitle1'>List images in acr</Typography>
                </Box>

                <Box sx={{ color: 'text.secondary', fontSize: 14, ml: 4 }}>
                    <code>{`az acr repository list --name ${vars.acrId} -otable`}</code>
                </Box>
            </Box>

            <Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    <Badge badgeContent='4' color='primary' sx={{ top: '12px', mr: 3, ml: 1 }} />
                    <Typography variant='subtitle1'>Push images</Typography>
                </Box>

                <Box sx={{ color: 'text.secondary', fontSize: 14, ml: 4 }}>
                    <code>
                        {`# pull down your example of choice`}
                        <br />
                        {`# golang hello world`}
                        <br />
                        git clone git@github.com:dolittle-entropy/go-hello-world
                        <br />
                        <br />
                        # build go-hello-world docker image
                        <br />
                        docker build -t go-hello-world .
                        <br />
                        <br />
                        # tag the image with the url to container registry
                        <br />
                        {`docker tag go-hello-world:latest ${vars.dockerCredentials.repoUrl}/go-hello-world:latest`}
                        <br />
                        <br />
                        # push the image to container registry
                        <br />
                        {`docker push ${vars.dockerCredentials.repoUrl}/go-hello-world:latest`}
                    </code>
                </Box>
            </Box>
        </Paper>
    );
};

{/* <ReactMarkdown remarkPlugins={[gfm]}>
    {data}
</ReactMarkdown> */}
