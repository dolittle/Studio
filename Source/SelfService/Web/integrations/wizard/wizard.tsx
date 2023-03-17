// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { Stepper } from '@dolittle/design-system';

import { WizardStepOne } from './steps/wizardStepOne';
import { WizardStepTwo } from './steps/wizardStepTwo';
import { WizardStepThree } from './steps/wizardStepThree';
import { WizardFinished } from './steps/wizardFinished';

export const Wizard = () => {
    return (
        <>
            <Typography variant='h1' sx={{ mb: 3 }}>New M3 Connection</Typography>

            <Stepper
                steps={[
                    {
                        label: 'Configure Firewall',
                        render: () => <WizardStepOne />,
                    },
                    {
                        label: 'M3 Credentials',
                        render: () => <WizardStepTwo />,
                    },
                    {
                        label: 'Review',
                        render: () => <WizardStepThree />,
                    },
                ]}
                finishedContent={<WizardFinished />}
            />
        </>
    );
};
