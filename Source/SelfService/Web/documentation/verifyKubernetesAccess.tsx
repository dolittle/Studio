// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Info, SubjectRulesReviewStatus } from '../stores/documentationInfo';

type Vars = {
    clusterName: string
    resourceGroup: string
    subscriptionId: string
    applicationId: string
    subjectRulesReviewStatus: SubjectRulesReviewStatus
    environment: string
};


function templateResource(namespace: string, resource: string, name: string): string {
    const markdown = `
~~~sh
kubectl -n ${namespace} get ${resource} ${name}
~~~
`;
    return markdown.trim();
}

function template(vars: Vars): string {
    const namespace = `application-${vars.applicationId}`;

    const secrets = vars.subjectRulesReviewStatus.resourceRules
        .filter(resourceRule => resourceRule.resources.includes('secrets'))
        .flatMap(resourceRule => resourceRule.resourceNames.map(resourceName => {
            return {
                namespace,
                resource: 'secrets',
                resourceName,
                environment: vars.environment,
            };
        }))
        .filter(o => o.resourceName.includes(o.environment.toLowerCase()))
        .map(o => templateResource(o.namespace, o.resource, o.resourceName));

    const configMaps = vars.subjectRulesReviewStatus.resourceRules
        .filter(resourceRule => resourceRule.resources.includes('configmaps'))
        .flatMap(resourceRule => resourceRule.resourceNames.map(resourceName => {
            return {
                namespace,
                resource: 'configmaps',
                resourceName,
                environment: vars.environment,
            };
        }))
        .filter(o => o.resourceName.includes(o.environment.toLowerCase()))
        .map(o => templateResource(o.namespace, o.resource, o.resourceName));

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
kubectl -n ${namespace} get pods
~~~

# Resources you have access too
${configMaps.join('\n')}
${secrets.join('\n')}

`;
    return markdown.trim();
};

type Props = {
    info: Info
    environment: string
};

export const Doc: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const info = _props.info;

    const vars = {
        clusterName: info.clusterName,
        resourceGroup: info.resourceGroup,
        subscriptionId: info.subscriptionId,
        applicationId: info.applicationId,
        subjectRulesReviewStatus: info.subjectRulesReviewStatus,
        environment: _props.environment,
    } as Vars;


    const data = template(vars);

    return (
        <ReactMarkdown remarkPlugins={[gfm]} >
            {data}
        </ReactMarkdown>
    );
};

