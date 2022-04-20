// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { SxProps } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    buttonType?: 'primary' | 'secondary'
    disabled?: boolean
    children: React.ReactNode;
    withIcon?: boolean;
    // If startIcon is added, it will override withIcon
    startIcon?: React.ReactNode;
    className?: any;
    size?: 'small' | 'medium' | 'large';
};

const defaultOnClick = (event: React.MouseEvent<HTMLElement>) => { };

const styles = {
    base: {
        textTransform: 'uppercase',
        padding: '8px 12px',
        backgroundColor: 'transparent',
    } as SxProps,
    secondary: {
        'color': '#FAFAFA',
        'backgroundColor': 'transparent',
        '&:hover': {
            color: '#B3BBFB',
            backgroundColor: 'transparent'
        },
        '&:disabled': {
            color: '#93959F',
            backgroundColor: 'transparent'
        },
        '&:active': {
            color: '#8C9AF8',
            backgroundColor: 'transparent'
        },
        '&:focus': {
            color: '#8C9AF8',
            backgroundColor: 'transparent'
        }

    } as SxProps,
    primary: {
        'color': '#6678F6',
        '&:hover': {
            color: '#B3BBFB',
            backgroundColor: 'transparent'
        },
        '&:disabled': {
            color: '#93959F',
            backgroundColor: 'transparent'
        },
        '&:active': {
            color: '#8C9AF8',
            backgroundColor: 'transparent'
        },
        '&:focus': {
            color: '#8C9AF8',
            backgroundColor: 'transparent'
        }
    } as SxProps,
};

export const ButtonText: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const children = _props.children;
    const onClick = _props.onClick ?? defaultOnClick;
    const disabled = _props.disabled ?? false;
    const buttonType = _props.buttonType ?? 'primary';
    const buttonTypeStyles = styles[buttonType];
    const buttonSize = _props.size ?? 'medium';

    let startIcon: React.ReactNode = _props.withIcon ? <AddIcon /> : null;
    startIcon = _props.startIcon ?? startIcon;

    return (
        <MuiButton
            sx={{ ...styles.base, ...buttonTypeStyles } as SxProps}
            disableRipple={true}
            disabled={disabled}
            startIcon={startIcon}
            onClick={onClick}
            // className={clsx(classes.base, buttonTypeClassName, _props.className)}
            size={buttonSize}
        >
            {children}
        </MuiButton>
    );
};
