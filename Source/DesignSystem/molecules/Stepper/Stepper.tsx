// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Box, Stepper as MuiStepper, Step, StepLabel, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

type StepContent = {
    /**
     * The `label` to display for the step.
     */
    label: string;

    /**
     * The react element to `render` when the step is active.
     */
    render: () => React.ReactNode;
};

export type StepperProps = {
    /**
     * The content to display for each step.
     *
     * Add as array of objects by providing a `label` and a react element to `render`.
     */
    steps: StepContent[];

    /**
     * The `react element` to display when the stepper is finished.
     */
    finishedContent?: React.ReactNode;

    /**
     * The index of the optional step.
     */
    optionalStepIndex?: number;
};

export const Stepper = ({ steps, finishedContent, optionalStepIndex }: StepperProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedStep, setSkippedStep] = useState(new Set<number>());

    // Scroll to top of page when active step changes.
    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [activeStep]);

    const isStepOptional = (step: number) => {
        return step === optionalStepIndex;
    };

    const isStepSkipped = (step: number) => {
        return skippedStep.has(step);
    };

    const handleSkipStep = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error(`You can't skip a step that isn't optional.`);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);

        setSkippedStep(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleNextStep = () => {
        let newSkipped = skippedStep;

        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkippedStep(newSkipped);
    };

    const handleBackStep = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 10 }}>
            <MuiStepper activeStep={activeStep} sx={{ mb: 3.5 }}>
                {steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode; } = {};

                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant='caption'>Optional</Typography>;
                    }

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }

                    return (
                        <Step
                            key={index}
                            sx={{
                                pl: index === 0 ? 0 : 1,
                                pr: index === steps.length - 1 ? 0 : 1,
                            }}
                            {...stepProps}
                        >
                            <StepLabel {...labelProps}>{step.label}</StepLabel>
                        </Step>
                    );
                })}
            </MuiStepper>

            <Box sx={{ width: 1, maxWidth: 814, alignSelf: 'center', mb: 11 }}>
                {activeStep !== steps.length ?
                    steps[activeStep]?.render() :
                    finishedContent
                }
            </Box>

            {activeStep !== steps.length &&
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                        label='Cancel'
                        color='subtle'
                        disabled={activeStep === 0}
                        onClick={handleBackStep}
                    />

                    {isStepOptional(activeStep) && (
                        <Button
                            label='Skip'
                            color='secondary'
                            onClick={handleSkipStep}
                            sx={{ ml: 2 }}
                        />
                    )}

                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button
                        label='Back'
                        color='subtle'
                        variant='outlined'
                        disabled={activeStep === 0}
                        onClick={handleBackStep}
                        sx={{ mr: 3 }}
                    />

                    <Button
                        label={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        variant='filled'
                        onClick={handleNextStep}
                    />
                </Box>
            }
        </Box>
    );
};
