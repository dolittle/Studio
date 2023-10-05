// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import ReactMarkdown from 'react-markdown';

import gfm from 'remark-gfm';

import { Info, SubjectRulesReviewStatus } from '../../stores/documentationInfo';

export type Vars = {
    clusterName: string;
    resourceGroup: string;
    subscriptionId: string;
    applicationId: string;
    subjectRulesReviewStatus: SubjectRulesReviewStatus;
};

function templateResource(namespace: string, resource: string, name: string): string {
    const markdown = `
~~~sh
kubectl -n ${namespace} get ${resource} ${name}
~~~
`;
    return markdown.trim();
};

function template(vars: Vars): string {
    const namespace = `application-${vars.applicationId}`;

    const secrets = vars.subjectRulesReviewStatus.resourceRules
        .filter(resourceRule => resourceRule.resources.includes('secrets'))
        .flatMap(resourceRule => resourceRule.resourceNames.map(resourceName => {
            return {
                namespace,
                resource: 'secrets',
                resourceName,
            };
        }))
        .map(o => templateResource(o.namespace, o.resource, o.resourceName));

    const configMaps = vars.subjectRulesReviewStatus.resourceRules
        .filter(resourceRule => resourceRule.resources.includes('configmaps'))
        .flatMap(resourceRule => resourceRule.resourceNames.map(resourceName => {
            return {
                namespace,
                resource: 'configmaps',
                resourceName,
            };
        }))
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

# Missing Azure Auth Plugin

If faced with something like
> error: The azure auth plugin has been removed.
> Please use the https://github.com/Azure/kubelogin kubectl/client-go
> See https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins for more details.

This means that you have a kubectl version newer than December 2022 (congratulations!).
You need to install kubelogin to be able to login to kubernetes.

Install kubelogin following the instructions in the
[readme](https://github.com/Azure/kubelogin/blob/master/README.md).

Copying the latest releases to the shall's search path, assumes a working
knowledge of your shell. In bash you can do this by downloading the correct
release-file from github and adding the binary to your path by adding this line
to your .bashrc or .bash_profile

~~~sh
export PATH=$PATH:~/Downloads/kubelogin/bin/linux_amd64/kubelogin
~~~

Verify that kubelogin is installed and working by running
~~~sh
kubelogin --help
~~~

If you get the kubelogin help text, you are good to go, and can let kubelogin
handle access to the cluster by running

~~~sh
kubelogin convert-kubeconfig -l azurecli
~~~

You can now verify that you have access to the cluster by running the get pods
command again.

~~~sh
kubectl -n ${namespace} get pods
~~~

# Resources you have access to
${configMaps.join('\n')}
${secrets.join('\n')}

`;
    return markdown.trim();
};

export type VerifyKubernetesAccessProps = {
    info: Info;
};

export const VerifyKubernetesAccess = ({ info }: VerifyKubernetesAccessProps) => {
    const vars = {
        clusterName: info.clusterName,
        resourceGroup: info.resourceGroup,
        subscriptionId: info.subscriptionId,
        applicationId: info.applicationId,
        subjectRulesReviewStatus: info.subjectRulesReviewStatus,
    } as Vars;

    const data = template(vars);

    return (
        <ReactMarkdown remarkPlugins={[gfm]}>
            {data}
        </ReactMarkdown>
    );
};
