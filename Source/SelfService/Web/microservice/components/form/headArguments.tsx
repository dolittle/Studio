// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ChangeEvent, useState } from 'react';

import { Box, TextField } from '@mui/material';
import { AddCircleRounded, DeleteRounded } from '@mui/icons-material';

import { Button } from '@dolittle/design-system';

type HeadArgumentsProps = {
    cmdArgs: string[];
    setCmdArgs: (args: string[]) => void;
    disabled?: boolean;
};

export const HeadArguments = ({ cmdArgs, setCmdArgs, disabled }: HeadArgumentsProps) => {
    const [emptyFieldError, setEmptyFieldError] = useState<string[]>([]);

    const emptyFieldList: string[] = [];

    const handleChangeArg = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, argIndex: number) => {
        // Remove error if field is no longer empty.
        if (event.target.value) {
            const newError = [...emptyFieldError];
            const id = 'headArg' + argIndex.toString();
            const index = newError.indexOf(id);
            if (index > -1) newError.splice(index, 1);
            setEmptyFieldError(newError);
        }

        // Prevents user from entering a multible spaces.
        if (event.target.value.includes(`  `)) return;

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
            {cmdArgs.map((arg, argIndex) => {
                const id = 'headArg' + argIndex.toString();

                // Handle empty fields. If there is an empty field, add it to the list of empty fields.
                if (!arg) emptyFieldList.push(id);
                const hasEmptyField = emptyFieldError.includes(id);

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }} key={argIndex}>
                        <TextField
                            id={id}
                            label='CMD Argument'
                            value={arg}
                            autoFocus
                            onBlur={() => setEmptyFieldError(emptyFieldList)}
                            error={hasEmptyField}
                            helperText={hasEmptyField ? 'Please enter a CMD argument.' : ''}
                            disabled={disabled}
                            onChange={event => handleChangeArg(event, argIndex)}
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
                );
            })}

            <Button
                label='Add CMD argument'
                secondary
                startWithIcon={<AddCircleRounded />}
                disabled={disabled || emptyFieldError.length > 0}
                onClick={handleAddArg}
                sx={{ justifyContent: 'start', mt: 2.5 }}
            />
        </Box>
    );
};
