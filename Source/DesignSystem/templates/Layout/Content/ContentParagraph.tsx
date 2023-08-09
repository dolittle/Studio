// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

export type ContentParagraphProps = TypographyProps;
export const ContentParagraph = (props: ContentParagraphProps) => {
    return (
        <Typography my={2} {...props}>
            {props.children}
        </Typography>
    );
};
