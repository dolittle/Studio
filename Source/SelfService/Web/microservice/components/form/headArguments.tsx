// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box } from '@mui/material';
import { AddCircleRounded, DeleteRounded } from '@mui/icons-material';

import { Button, Input } from '@dolittle/design-system';

type HeadArgumentsProps = {
    cmdArgs: string[];
    setCmdArgs: (args: string[]) => void;
    disabled?: boolean;
};

export const HeadArguments = ({ cmdArgs, setCmdArgs, disabled }: HeadArgumentsProps) => {
    const [hasEmptyFiel, setHasEmptyField] = useState(false);

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

    const checkForEmptyField = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        event.target.value ? setHasEmptyField(false) : setHasEmptyField(true);
    };

    return (
        <Box>
            {cmdArgs.map((_, argIndex) => (
                <Box key={argIndex}>
                    <Input
                        id={'headArguments.' + argIndex.toString()}
                        label='CMD Argument'
                        autoFocus
                        disabled={disabled}
                        required
                        onBlur={checkForEmptyField}
                        sx={{ width: 220 }}
                    />
                    <Button
                        label='Remove'
                        secondary
                        disabled={disabled}
                        startWithIcon={<DeleteRounded />}
                        onClick={() => handleRemoveArg(argIndex)}
                        sx={{ m: 1.5 }}
                    />
                </Box>
            ))}

            <Button
                label='Add CMD argument'
                secondary
                startWithIcon={<AddCircleRounded />}
                disabled={hasEmptyFiel}
                onClick={handleAddArg}
                sx={{ mt: 2.5 }}
            />
        </Box>
    );
};
