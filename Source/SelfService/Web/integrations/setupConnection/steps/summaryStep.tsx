// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Button } from '@dolittle/design-system';
import { Box } from '@mui/material';
import { useWizardContext } from '../WizardContext';
import { WizardActionKind } from '../wizardReducer';

export const SummaryStep = () => {
    const wizardContext = useWizardContext();
    return (
        <>
            Summary
            <Box>
                <Button label='cancel' color='subtle' onClick={() => { }} />
                <Button label='back' variant='filled' onClick={() => {
                    wizardContext.dispatch({ type: WizardActionKind.PreviousStep });
                 }} />
                <Button
                    label='next'
                    variant='filled'
                    onClick={() => {
                        wizardContext.dispatch({ type: WizardActionKind.NextStep });
                    }} />
            </Box>
        </>
    );
};
