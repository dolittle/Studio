// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { Input, Select, Tooltip } from '@dolittle/design-system';

import { getRuntimes } from '../../../../apis/solutions/api';

import { getRuntimeNumberFromString, lowerCaseHyphenRegex } from '../../../../utils/helpers';

const runtimeDescription = `By using the Dolittle runtime you'll have access to storage through event sourcing and be able to 
                            communicate with other microservices through the event horizon with the Dolittle SDK.`;

export type SetupFieldsProps = {
    environments: string[];
    runtimeVersion?: string;
    hasDashedBorder?: boolean;
    isEditMode?: boolean;
    isDisabled?: boolean;
    onEnvironmentSelect?: (environment: string) => void;
};

export const SetupFields = ({ environments, runtimeVersion, hasDashedBorder, isEditMode, isDisabled, onEnvironmentSelect }: SetupFieldsProps) => {
    const [showEnvironmentInfo, setShowEnvironmentInfo] = useState(false);
    const [showEntrypointInfo, setShowEntrypointInfo] = useState(false);

    const runtimeNumberOptions = [
        ...getRuntimes().map(runtimeInfo => ({
            value: runtimeInfo.image,
            displayValue: getRuntimeNumberFromString(runtimeInfo.image),
        })),
        {
            value: 'none',
            displayValue: 'None',
        },
    ];

    // Push the current runtime version to the top of the 'runtimeNumberOptions' list.
    if (runtimeVersion) {
        runtimeNumberOptions.unshift({
            value: runtimeVersion,
            displayValue: getRuntimeNumberFromString(runtimeVersion),
        });
    }

    return (
        <Stack sx={{ mb: 4 }}>
            <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

            <Input
                id='microserviceName'
                label='Microservice Name'
                dashedBorder={hasDashedBorder}
                disabled={isDisabled}
                required='Provide a microservice name.'
                pattern={{
                    value: lowerCaseHyphenRegex,
                    message: `Only lowercase letters, numbers and - in the middle are allowed.`,
                }}
            />

            <Tooltip
                tooltipTitle='Development Environment'
                tooltipText='The environment where your microservice will be deployed.'
                open={showEnvironmentInfo}
                handleOpen={() => setShowEnvironmentInfo(true)}
                handleClose={() => setShowEnvironmentInfo(false)}
            >
                <Select
                    id='developmentEnvironment'
                    label='Development Environment'
                    options={environments?.map(env => ({ value: env, displayValue: env })) || []}
                    onOpen={() => setShowEnvironmentInfo(true)}
                    onChange={event => onEnvironmentSelect ? onEnvironmentSelect(event.target.value) : null}
                    disabled={isDisabled}
                    required
                    sx={hasDashedBorder ? { '& fieldset': { borderStyle: 'dashed' } } : {}}
                />
            </Tooltip>

            <Tooltip
                tooltipTitle='Runtime'
                tooltipText={runtimeDescription}
                open={showEntrypointInfo}
                handleOpen={() => setShowEntrypointInfo(true)}
                handleClose={() => setShowEntrypointInfo(false)}
            >
                <Select
                    id='runtimeVersion'
                    label='Runtime Version'
                    options={runtimeNumberOptions}
                    onOpen={() => setShowEntrypointInfo(true)}
                    required
                    disabled={isEditMode}
                    sx={hasDashedBorder ? { '& fieldset': { borderStyle: 'dashed' } } : {}}
                />
            </Tooltip>
        </Stack>
    );
};
