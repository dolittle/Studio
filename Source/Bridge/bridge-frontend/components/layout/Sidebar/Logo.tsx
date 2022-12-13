// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Box } from '@mui/material';
import Link from '../../navigation/Link';

export type LogoProps = {
    logo?: React.ReactNode;
    href?: string;
};

export const Logo = (props: LogoProps) => {
    return <Box
        sx={{
            p: 2,
            mb: 2
        }}
    >{props.href ? (<Link href={props.href}>{props.logo}</Link>) : props.logo}</Box>;
};
