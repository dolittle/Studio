// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';
import { AddCircleRounded, DeleteRounded } from '@mui/icons-material/';

import { Input } from '@dolittle/design-system/atoms/Forms';
import { Button } from '@dolittle/design-system/atoms/Button/Button';


type HeadArgumentsProps = {
    args: string[];
    setArgs: any; //(args: string[]) => void
    disabled?: any;
};

export const HeadArguments = (props: HeadArgumentsProps) => {
    const _props = props!;
    const args = _props.args;
    const setArgs = _props.setArgs;
    const disabled = _props.disabled;

    const handleArg = (event: React.ChangeEvent<HTMLInputElement>, argIndex: number) => {
        const newArgs = [...args];
        newArgs[argIndex] = event.target.value;
        setArgs(newArgs);
    };

    const handleAddArg = (event: React.MouseEvent<HTMLElement>) => {
        const newArgs = [...args];
        newArgs.push('');
        setArgs(newArgs);
    };

    const handleRemoveArg = (event: React.MouseEvent<HTMLElement>, argIndex: number) => {
        const newArgs = [...args];
        newArgs.splice(argIndex, 1);
        setArgs(newArgs);
    };

    return (
        <>
            <Box flexDirection='column' display='flex' justifyContent='flex-start' style={{ gap: '1rem' }}>
                {args.map((arg, argIndex) => (
                    <Box display='flex' justifyContent='flex-start' style={{ gap: '1rem' }} key={argIndex}>
                        <Input
                            id={'headArg' + argIndex.toString()}
                            label='CMD Argument'
                            value={arg}
                            onChange={(event) => handleArg(event, argIndex)}
                        />
                        <Button
                            variant='text'
                            label='Remove'
                            startWithIcon={<DeleteRounded />}
                            size='small'
                            onClick={(event) => handleRemoveArg(event, argIndex)}
                            sx={{ color: 'text.primary' }}
                        />
                    </Box>
                ))}
            </Box>

            <Button
                variant='text'
                label='Add CMD argument'
                startWithIcon={<AddCircleRounded />}
                disabled={disabled}
                onClick={(event) => handleAddArg(event)}
                sx={{ justifyContent: 'start', mt: 2.5 }}
            />
        </>
    );
};
