// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Info } from '../stores/documentationInfo';

import { getContainerRegistry } from '../api/cicd';

type Vars = {
    acrId: string
    subscriptionId: string
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


# Login to your registry in docker
~~~sh
docker login ${vars.acrId}.todo
~~~

`;
    return markdown.trim();
};

type Props = {
    info: Info
};

export const Doc: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const info = _props.info;

    const [loaded, setLoaded] = useState(false);
    const [containerRegistry, setContainerRegistry] = useState({});

    useEffect(() => {
        Promise.all([
            getContainerRegistry(info.applicationId),
        ]).then(values => {
            setContainerRegistry(values[0]);
            setLoaded(true);
        });

    }, []);

    if (!loaded) {
        return null;
    }


    const vars = {
        acrId: info.containerRegistryName,
        subscriptionId: info.subscriptionId,
    } as Vars;

    console.log(containerRegistry);
    console.log(JSON.parse(atob(containerRegistry['.dockerconfigjson'])).auths);
    // JSON.parse(atob(a[".dockerconfigjson"])).auths
    const data = template(vars);
    return (
        <ReactMarkdown remarkPlugins={[gfm]} >
            {data}
        </ReactMarkdown>
    );
};

