// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ChangeEvent, MouseEvent } from 'react';

import { Box, TextField } from '@mui/material';
import { AddCircleRounded, DeleteRounded } from '@mui/icons-material/';

import { Button } from '@dolittle/design-system/atoms/Button';

type HeadArgumentsProps = {
    cmdArgs: string[];
    setCmdArgs: (args: string[]) => void;
    disabled?: boolean;
};

export const HeadArguments = ({ cmdArgs, setCmdArgs, disabled }: HeadArgumentsProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, argIndex: number) => {
        const newArgs = [...cmdArgs];
        newArgs[argIndex] = event.target.value;
        setCmdArgs(newArgs);
    };

    const handleAddArg = (event: MouseEvent<HTMLElement>) => {
        const newArgs = [...cmdArgs];
        newArgs.push('');
        setCmdArgs(newArgs);
    };

    const handleRemoveArg = (event: MouseEvent<HTMLElement>, argIndex: number) => {
        const newArgs = [...cmdArgs];
        newArgs.splice(argIndex, 1);
        setCmdArgs(newArgs);
    };

    return (
        <Box>
            {cmdArgs.map((arg, argIndex) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} key={argIndex}>
                    <TextField
                        id={'headArg' + argIndex.toString()}
                        label='CMD Argument'
                        value={arg}
                        disabled={disabled}
                        onChange={(event) => handleChange(event, argIndex)}
                        size='small'
                        variant='outlined'
                        sx={{ width: 220 }}
                    />
                    <Button
                        variant='text'
                        label='Remove'
                        disabled={disabled}
                        startWithIcon={<DeleteRounded />}
                        onClick={(event) => handleRemoveArg(event, argIndex)}
                        sx={{ color: 'text.primary', height: 29 }}
                    />
                </Box>
            ))}

            <Button
                variant='text'
                label='Add CMD argument'
                startWithIcon={<AddCircleRounded />}
                disabled={disabled}
                onClick={(event) => handleAddArg(event)}
                sx={{ justifyContent: 'start', mt: 2.5, color: 'text.primary' }}
            />
        </Box>
    );
};
