// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

import { Input, Select, SelectPropsOptions, Tooltip } from '@dolittle/design-system';

import { MaxWidthTextBlock } from './MaxWidthTextBlock';
import { Link } from '../../../../apis/integrations/generated';



const newConnectionDescription = `This process might take some time depending on access rights and working knowledge of
                    your organization's firewall and M3 system. You can always save and create the connection setup details then come back at a later time to finish.`;
const ConnectorNameTooltipText = () =>
    <>
        Provide a name for this M3 connector instance. You can have multiple M3 connectors.
        We recommend naming your connector based on its intended use. For example, <i>M3 Connector Test</i> or <i>M3 Connector Production</i>.
    </>;
const hostingTooltipText = `Currently, you can only setup the connection with on premise hosting. Soon, we will support setup in the
                    cloud where Dolittle takes care of hosting, establishing backups and making sure the connector is running.`;



const getSelectValues = (links?: Link[] | null) => {
    const shouldUseOnPrem = links?.some(link => link.rel === 'deploy-on-premises') || false;
    const shouldUseCloud = links?.some(link => link.rel === 'deploy-to-cloud') || false;
    const selectValues: SelectPropsOptions = [];

    if (shouldUseOnPrem) {
        selectValues.push({ value: 'On Premise', displayValue: 'On Premise' });
    }
    if (shouldUseCloud) {
        selectValues.push({ value: 'In the Dolittle Cloud', displayValue: 'In the Dolittle Cloud' });
    }
    return selectValues;
};

export type MainM3ConnectionInfoProps = {
    hasSelectedDeploymentType: boolean;
    connectionIdLinks?: Link[] | null;
};

export const MainM3ConnectionInfo = (props: MainM3ConnectionInfoProps) => {
    const hasSelectedDeploymentType = props.hasSelectedDeploymentType; //check value on entity

    return (
        <Stack spacing={3.5} sx={{ mt: 3, ml: 3 }}>
            <MaxWidthTextBlock>{newConnectionDescription}</MaxWidthTextBlock>

            <Tooltip tooltipTitle='Connector Name' tooltipText={<ConnectorNameTooltipText />}>
                <Input id='connectorName' label='Connector Name *' onChange={(e) => {
                    //store value in a smart place (like state)
                    // parent should have access to state
                    //dispatch({ key: ConnectionConfigurationActionKind.NameSet, payload: e.target.value });
                }} />
            </Tooltip>

            <Tooltip tooltipTitle='Hosting' tooltipText={hostingTooltipText} displayOnHover>
                <Select id='selectHosting' label='Hosting *' options={getSelectValues(props.connectionIdLinks)} disabled={hasSelectedDeploymentType} />
            </Tooltip>
        </Stack>
    );
};
