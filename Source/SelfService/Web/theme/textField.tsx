// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField as MuiTextField } from '@material-ui/core';
import { DocumentationContainerScreen } from '../documentation/container';

type Props = {
    id: string;
    label: string;
    value: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { };

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        base: {
            //textTransform: 'uppercase',
            //padding: '8px 12px',
            //marginTop: theme.spacing(1),
            //marginRight: theme.spacing(1),
            //color: '#2C2B33',

            '& .MuiOutlinedInput-input': {
                color: 'white'
            },
            '& .MuiInputLabel-root': {
                color: 'white'
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                color: 'white',
                borderColor: 'white'
            },
            '&:hover .MuiOutlinedInput-input': {
                color: 'white'
            },
        },
    })
);

export const TextField: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const _props = props!;
    const onChange = _props.onChange ?? defaultOnChange;
    const disabled = _props.disabled ?? false;
    const required = _props.required ?? true;
    const value = _props.value;
    const label = _props.label;
    const id = _props.id;
    return (
        <MuiTextField
            required={required}
            disabled={disabled}
            id={id}
            label={label}
            variant='outlined'
            className={clsx(classes.base)}
            value={value}
            onChange={onChange}
        />
    );
};
