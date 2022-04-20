// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import withStyles from '@mui/styles/withStyles';

import { FormControlLabel, Switch as MuiSwitch } from '@mui/material';


export type Props = {
    checked?: boolean;
    label?: string;
    onChange: (event: React.ChangeEvent<{}>, checked: boolean) => void;
};

const defaultOnClick = (event: React.ChangeEvent<{}>, checked: boolean) => { };


export const Switch = withStyles({
    switchBase: {
        'color': '#B3BBFB',
        '&$checked': {
            color: '#6678F6',
        },
        '&$checked + $track': {
            backgroundColor: '#6678F6',
        },
    },
    checked: {},
    track: {
        backgroundColor: '#93959F'
    },
})((props: Props) => {
    const checked = props.checked ?? false;
    const onChangeHandler = props.onChange ?? defaultOnClick;
    const label = props.label ?? '';
    return (<FormControlLabel
        control={<MuiSwitch {...props} color='secondary' checked={checked} onChange={onChangeHandler} />}
        label={label}
    />);
});
