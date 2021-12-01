// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Grid } from '@material-ui/core';

import { MicroserviceSimple } from '../../api/index';
import { HeaderDataRow } from '../components/headDataRow';

type Props = {
    microservice: MicroserviceSimple;
};

export const View: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const ms = _props.microservice;
    const msName = ms.name;

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
        </Grid >
    );
};
