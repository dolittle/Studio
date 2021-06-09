// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { HttpResponseApplications2 } from '../api/api';

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
`;
    return markdown.trim();
};

type Props = {
    application: HttpResponseApplications2
    info: any
};

export const Doc: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const info = _props.info;

    const vars = {
        acrId: info.customer.container_registry_name,
        subscriptionId: info.subscriptionId,
    } as Vars;

    const data = template(vars);
    return (
        <ReactMarkdown remarkPlugins={[gfm]} >
            {data}
        </ReactMarkdown>
    );
};

