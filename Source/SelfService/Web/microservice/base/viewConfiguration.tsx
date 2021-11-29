// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Box, Grid } from '@material-ui/core';

import { MicroservicePurchaseOrder } from '../../api/index';
import { HeaderDataRow } from './headDataRow';

type Props = {
    microservice: MicroservicePurchaseOrder;
};

export const ConfigView: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const ms = _props.microservice;
    const msName = ms.name;
    const publicUrl = `https://${ms.extra.ingress.host}${ms.extra.ingress.path}`;

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <HeaderDataRow
                head='Name'
                data={msName}
            />

            <HeaderDataRow
                head='Public Url'
                data={publicUrl}
            />

            <HeaderDataRow
                head='uuid provided'
                data={ms.dolittle.microserviceId}
            />

            <HeaderDataRow
                head='Head image'
                data={ms.extra.headImage}
            />

            <HeaderDataRow
                head='Runtime image'
                data={ms.extra.runtimeImage}
            />

            <Box py={1}>
                <h2>Ingress</h2>
                <HeaderDataRow
                    head='Path'
                    data={ms.extra.ingress.path}
                />

                <HeaderDataRow
                    head='PathType'
                    data={ms.extra.ingress.pathType}
                />

                <HeaderDataRow
                    head='Domain Prefix'
                    data={ms.extra.ingress.domainPrefix}
                />
            </Box>
        </Grid >
    );
};
