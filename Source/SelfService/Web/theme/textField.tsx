// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { SxProps } from '@mui/material/styles';
import { InputAdornment, TextField as MuiTextField } from '@mui/material';

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
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    size?: 'small' | 'medium' | undefined;
    autoComplete?: string;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
};

const styles = {
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
} as SxProps;

export const TextField: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const onChange = _props.onChange ?? undefined;
    const onKeyDown = _props.onKeyDown ?? undefined;
    const disabled = _props.disabled ?? false;
    const required = _props.required ?? true;
    const type = _props.type ?? 'text';
    const value = _props.value;
    const label = _props.label;
    const id = _props.id;
    const placeholder = _props.placeholder ?? '';
    const readOnly = _props.readOnly ?? false;
    const size = _props.size ?? 'medium';
    const autoComplete = _props.autoComplete ?? undefined;
    const fullWidth = _props.fullWidth ?? undefined;
    const startIcon = _props.startIcon
        ? (
            <InputAdornment position='start'>
                {_props.startIcon}
            </InputAdornment>
        ) : undefined;

    return (
        <MuiTextField
            sx={styles}
            required={required}
            disabled={disabled}
            id={id}
            label={label}
            variant='outlined'
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            InputProps={{
                readOnly,
                startAdornment: startIcon
            }}
            autoComplete={autoComplete}
            size={size}
            fullWidth={fullWidth}
        />
    );
};
