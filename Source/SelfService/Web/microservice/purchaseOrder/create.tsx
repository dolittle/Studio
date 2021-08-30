// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Grid } from '@material-ui/core';
import React from 'react';

import { HttpResponseApplications2 } from '../../api/api';

type Props = {
    application: HttpResponseApplications2
    environment: string
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <h1>Microservice Specific</h1>
            <h1>TODO Purchase Order</h1>
            <h2>Env: {_props.environment}</h2>
            <h2>TenantID: {_props.application.tenantId}</h2>
        </Grid>
    );
};
