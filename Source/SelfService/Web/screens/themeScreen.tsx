// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Box, Grid } from '@mui/material';
import React from 'react';
import { Button } from '../theme/button';

import { ButtonText } from '../theme/buttonText';
import { TextIconButton } from '../theme/downloadButton';

type Props = {
};

export const ThemeScreen: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    return (
        <>
            <h1>Theme Assets</h1>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Box m={2} pt={3}>
                    <p>Button</p>
                    <Button>Enabled</Button>
                    <Button disabled={true}>Disabled</Button>
                    <p>Button with icon</p>
                    <Button withIcon={true}>Enabled</Button>
                    <Button withIcon={true} disabled={true}>Disabled</Button>

                    <p>ButtonText</p>
                    <ButtonText>Button</ButtonText>
                    <ButtonText disabled={true}>Button</ButtonText>

                    <p>ButtonText with icon</p>
                    <ButtonText withIcon={true} >Enabled</ButtonText>
                    <ButtonText withIcon={true} disabled={true}>Disabled</ButtonText>

                    <p>ButtonText - secondary</p>
                    <ButtonText buttonType={'secondary'}>Enabled</ButtonText>
                    <ButtonText buttonType={'secondary'} disabled={true}>Disabled</ButtonText>


                    <p>ButtonText - secondary with icon</p>
                    <ButtonText buttonType={'secondary'} withIcon={true}>Enabled</ButtonText>
                    <ButtonText buttonType={'secondary'} withIcon={true} disabled={true}>Disabled</ButtonText>

                    <p>DownloadButton</p>
                    <TextIconButton>Enabled</TextIconButton>
                </Box>
            </Grid>
        </>
    );
};
