// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Grid } from '@material-ui/core';

import { HeaderDataRow } from '../components/headDataRow';
import { IngressURLWithCustomerTenantID, SimpleIngressPath } from '../../api/api';

type Props = {
    urls: IngressURLWithCustomerTenantID[];
    paths: SimpleIngressPath[];
};

export const View: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const urls = _props.urls;
    const paths = _props.paths;

    const tenantEndpoints = urls.map(info => {
        const data = `${info.url} (${info.customerTenantID})`;
        return <HeaderDataRow key={info.customerTenantID} head='' data={data} />;
    });

    const microservicePaths = paths.map(info => {
        return <HeaderDataRow key={info.path} head='' data={info.path} />;
    });

    return (

        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <h2>Tenant Endpoints</h2>
            {tenantEndpoints}

            <h2>Microservice Paths</h2>
            {microservicePaths}
        </Grid >
    );
};
