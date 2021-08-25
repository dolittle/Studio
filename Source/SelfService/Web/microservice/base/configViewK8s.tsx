// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { Grid } from '@material-ui/core';

const stackTokens = { childrenGap: 15 };

type Props = {
    microservice: any // TODO do we have a class for this?
};

export const ConfigViewK8s: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const ms = _props.microservice;

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
            <h1>Microservice Specific</h1>
            <Label>UUID</Label>
            <TextField defaultValue={ms.id} readOnly />

            <Label>Name</Label>
            <TextField defaultValue={ms.name} readOnly />

            <Label>Environment</Label>
            <TextField defaultValue={ms.environment} readOnly />

            <Label>Head Image</Label>
            <TextField defaultValue={headImage} readOnly />

            <Label>Runtime Image</Label>
            <TextField defaultValue={runtimeImage} readOnly />
        </Grid>
    );
};

