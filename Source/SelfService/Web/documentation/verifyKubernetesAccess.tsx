// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { HttpResponseApplication } from '../api/api';

type Vars = {
    clusterName: string
    resourceGroup: string
    subscriptionId: string
    applicationId: string
};


function template(vars: Vars): string {
    const markdown = `
# Login to azure

~~~sh
az login
~~~

# Azure Kubernetes Service
## Get credentials from Dolittle’s AKS cluster

~~~sh
az aks get-credentials -g ${vars.resourceGroup} -n ${vars.clusterName} --subscription ${vars.subscriptionId}
~~~

# Error
If faced with
> Due to a configuration change made by your administrator, or because you moved to a new location, you must enroll in multi-factor authentication to access
- Goto https://portal.azure.com
- Click on your name (top right corner)
- Click Switch Directory
- Try again


# Confirm access to kubernetes worked

~~~sh
kubectl -n application-${vars.applicationId} get pods
~~~

`;
    return markdown.trim();
};

type Props = {
    application: HttpResponseApplication
    info: any
};

export const Doc: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const info = _props.info;

    const vars = {
        clusterName: 'Cluster-Production-Three',
        resourceGroup: 'Infrastructure-Essential',
        subscriptionId: info.subscriptionId,
        applicationId: info.applicationId,
    } as Vars;


    const data = template(vars);

    return (
        <ReactMarkdown remarkPlugins={[gfm]} >
            {data}
        </ReactMarkdown>
    );
};

