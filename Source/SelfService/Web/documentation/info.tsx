// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';


import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { HttpResponseApplications2 } from '../api/api';

type RegistryInfo = {
    acrId: string
    subscriptionId: string
};


function getInfo(info: RegistryInfo): string {
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
`;
    return markdown.trim();
};

type Props = {
    application: HttpResponseApplications2
    info: any
};

export const ApplicationInfo: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const info = _props.info;

    const templdateData = {
        acrId: info.customer.container_registry_name,
        subscriptionId: info.subscriptionId,
    } as RegistryInfo;


    const data = getInfo(templdateData);

    return (
        <ReactMarkdown remarkPlugins={[gfm]} >
            {data}
        </ReactMarkdown>
    );
};

