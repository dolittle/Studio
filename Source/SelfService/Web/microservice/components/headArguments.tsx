// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information
import { Box } from '@material-ui/core';
import React from 'react';
import { ButtonText } from '../../theme/buttonText';

import { TextField } from '../../theme/textField';
import RemoveIcon from '@material-ui/icons/HighlightOff';


type Props = {
    args: string[];
    setArgs: (args: string[]) => void;
};

export const HeadArguments: React.FunctionComponent<Props> = (props) => {

    const args = props.args;
    const setArgs = props.setArgs;

    const handleArg = (event: React.ChangeEvent<HTMLInputElement>, argIndex: number) => {
        const newArgs = [...args];
        newArgs[argIndex] = event.target.value;
        setArgs(newArgs);
    }

    const handleAddArg = (event: React.MouseEvent<HTMLElement>) => {
        const newArgs = [...args];
        newArgs.push('');
        setArgs(newArgs);
    }

    const handleRemoveArg = (event: React.MouseEvent<HTMLElement>, argIndex: number) => {
        const newArgs = [...args];
        newArgs.splice(argIndex, 1)
        setArgs(newArgs);
    }

    return (<>
        <Box flexDirection='column' display='flex' justifyContent='flex-start' style={{ gap: '1rem' }}>
            {args.map((arg, argIndex) => (
                <Box display='flex' justifyContent='flex-start' style={{ gap: '1rem' }} key={argIndex}>
                    <TextField
                        id={'headArg' + argIndex.toString()}
                        label='Argument'
                        value={arg}
                        onChange={(event) => handleArg(event, argIndex)}
                        size='small'
                    />
                    <ButtonText
                        onClick={(event) => handleRemoveArg(event, argIndex)}
                        buttonType='secondary'
                        size='small'
                        startIcon={<RemoveIcon />}
                    >
                        Remove argument
                    </ButtonText>
                </Box>
            ))}
        </Box>
        <ButtonText
            onClick={(event) => handleAddArg(event)}
            buttonType='secondary'
            size='small'
            withIcon
        >
            Add argument
        </ButtonText>
    </>);
};
