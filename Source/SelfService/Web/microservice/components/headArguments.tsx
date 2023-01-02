// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ChangeEvent } from 'react';

import { Box, TextField } from '@mui/material';
import { AddCircleRounded, DeleteRounded } from '@mui/icons-material/';

import { Button } from '@dolittle/design-system';

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

    const handleAddArg = () => {
        const newArgs = [...cmdArgs];
        newArgs.push('');
        setCmdArgs(newArgs);
    };

    const handleRemoveArg = (argIndex: number) => {
        const newArgs = [...cmdArgs];
        newArgs.splice(argIndex, 1);
        setCmdArgs(newArgs);
    };

    return (
        <Box>
            {cmdArgs.map((arg, argIndex) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }} key={argIndex}>
                    <TextField
                        id={'headArg' + argIndex.toString()}
                        label='CMD Argument'
                        value={arg}
                        disabled={disabled}
                        onChange={event => handleChange(event, argIndex)}
                        size='small'
                        variant='outlined'
                        sx={{ width: 220 }}
                    />
                    <Button
                        label='Remove'
                        secondary
                        disabled={disabled}
                        startWithIcon={<DeleteRounded />}
                        onClick={() => handleRemoveArg(argIndex)}
                        sx={{ height: 29, ml: 2 }}
                    />
                </Box>
            ))}

            <Button
                label='Add CMD argument'
                secondary
                startWithIcon={<AddCircleRounded />}
                disabled={disabled}
                onClick={handleAddArg}
                sx={{ justifyContent: 'start', mt: 2.5 }}
            />
        </Box>
    );
};
