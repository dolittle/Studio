// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Box, Typography } from '@mui/material';

const styles = {

    label: {
        paddingBottom: 2,
        color: theme => theme.palette.text.primary
    },
    data: {
        color: theme => theme.palette.text.secondary
    },

};

export interface HeaderDataRowProps {
    head: string
    data: string
}

export const HeaderDataRow: React.FunctionComponent<HeaderDataRowProps> = (props) => {
    const head = props!.head;
    const data = props!.data;

    return (
        <Box px={0} mx={0} py={1}>
            <Typography component="p" sx={styles.label}>
                {head}
            </Typography>

            <Typography component="p" sx={styles.data}>
                {data}
            </Typography>
        </Box>
    );
};
