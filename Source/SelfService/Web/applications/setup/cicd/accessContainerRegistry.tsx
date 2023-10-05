// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';

import gfm from 'remark-gfm';

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
        <ReactMarkdown remarkPlugins={[gfm]}>
            {data}
        </ReactMarkdown>
    );
};
