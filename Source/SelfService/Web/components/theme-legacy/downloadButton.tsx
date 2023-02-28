// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';
import { ButtonText } from './buttonText';
import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Props {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    children: React.ReactNode;
}

const defaultOnClick = (event: React.MouseEvent<HTMLElement>) => { };

export const DownloadButton: React.FunctionComponent<Props> = (props) => {
    const children = props!.children;
    const onClick = props!.onClick ?? defaultOnClick;

    return (
        <ButtonText
            {...props}
            disabled={false}
            withIcon={false}
            onClick={onClick}
            startIcon={<GetAppIcon />}
        >
            {children}
        </ButtonText>
    );
};
