// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Box, Grid } from '@material-ui/core';

import { MicroservicePurchaseOrder, MicroserviceSimple } from '../../api/index';
import { HeaderDataRow } from './headDataRow';

type Props = {
    microservice: any;
};

export const ConfigViewK8s: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const ms = _props.microservice;
    const msName = ms.name;
    console.log(ms);

    let headImage = 'n/a';
    try {
        headImage = ms.images.find(img => img.name === 'head').image;
    } catch (e) {
        // Intentional skip
    }

    let runtimeImage = 'n/a';
    try {
        runtimeImage = ms.images.find(img => img.name === 'runtime').image;
    } catch (e) {
        // Intentional skip
    }


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
