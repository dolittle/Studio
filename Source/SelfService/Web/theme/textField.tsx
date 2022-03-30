// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField as MuiTextField } from '@material-ui/core';

type Props = {
    id: string;
    label: string;
    value: string;
    type?: string; // input type https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { };

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        base: {
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
    const type = _props.type ?? 'text';
    const value = _props.value;
    const label = _props.label;
    const id = _props.id;
    const placeholder = _props.placeholder ?? '';
    const readOnly = _props.readOnly ?? false;
    return (
        <MuiTextField
            required={required}
            disabled={disabled}
            id={id}
            label={label}
            variant='outlined'
            type={type}
            className={clsx(classes.base)}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            InputProps={{ readOnly }}
        />
    );
};
