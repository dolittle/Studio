// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { getTenant } from '../store';

type RegistryInfo = {
    acrId: string
    subscriptionId: string
    environment: string
    exampleRepo: string
};


async function getInfo(tenantId: string, applicationId: string): Promise<string> {
    console.log(`//TODO lookup info tenant: ${tenantId} application: ${applicationId}`);

    const info = {
        acrId: '453e04a74f9d42f2b36cd51fa2c83fa3',
        subscriptionId: 'e7220048-8a2c-4537-994b-6f9b320692d7',
        exampleRepo: 'taco/order'
    } as RegistryInfo;

    const markdown = `
# Login to az

~~~sh
az login
~~~

# Login to your registry
~~~sh
az acr login -n ${info.acrId} --subscription ${info.subscriptionId}
~~~


# List images in acr
~~~sh
az acr repository list --name ${info.acrId} -otable
~~~

# Get the latest 10 tags for one image
~~~sh
az acr repository show-tags --name ${info.acrId} --repository ${info.exampleRepo} -otable --orderby time_desc --top 10
~~~
`;
    return markdown.trim();
};

export const ApplicationInfo: React.FunctionComponent = () => {
    const tenantId = getTenant();
    const { applicationId } = useParams() as any;
    const [data, setData] = useState('');

    useEffect(() => {
        getInfo(tenantId, applicationId).then(info => setData(info));
    }, []);

    const info = getInfo(tenantId, applicationId);

    return (
        <ReactMarkdown remarkPlugins={[gfm]} >
            {data}
        </ReactMarkdown>
    );
};

