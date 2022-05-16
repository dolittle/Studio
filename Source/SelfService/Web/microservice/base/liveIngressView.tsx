// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Grid, Typography } from '@mui/material';

import { HeaderDataRow } from '../components/headDataRow';
import { IngressURLWithCustomerTenantID, SimpleIngressPath } from '../../api/api';

type Props = {
    urls: IngressURLWithCustomerTenantID[];
    paths: SimpleIngressPath[];
};

export const LiveIngressView: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const urls = _props.urls;
    const paths = _props.paths;

    const tenantEndpoints = urls.map(info => {
        const data = `${info.url} (${info.customerTenantID})`;
        // React is unhappy when customTenantID is empty multiple times
        const key = `${info.url}-${info.customerTenantID}`;
        return <HeaderDataRow key={key} head='' data={data} />;
    });

    // Showing unique paths
    const microservicePaths = [...new Set(paths.map(info => info.path))].map(infoPath => {
        return <HeaderDataRow key={infoPath} head='' data={infoPath} />;
    });


    return (

        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            {tenantEndpoints.length > 0 &&
                <>
                    <Typography variant='h2' my={2}>Tenant Endpoints</Typography>
                    {tenantEndpoints}
                </>
            }

            <Typography variant='h2' my={2}>Microservice Paths</Typography>
            {microservicePaths}
        </Grid >
    );
};
