// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO validate the data
// TODO change action button from create to save
import React from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text, IDropdownOption } from '@fluentui/react';

import { Create as BusinessMomentsAdaptor } from './businessMomentsAdaptor/create';
import { Create as Base } from './base/create';
import { Create as StaticSite } from './staticSite/create';
import { Create as RawDataLog } from './rawDataLog/create';
import { HttpResponseApplications2 } from '../api/api';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
};

export const Create: React.FunctionComponent<Props | undefined> = (props) => {
    const { environment } = useParams() as any;
    const _props = props!;
    const [microserviceTypeState, setMicroserviceTypeState] = React.useState('');
    const microserviceTypes: IDropdownOption[] = [
        { key: 'dolittle-microservice', text: 'Default Microservice' },
        { key: 'business-miner', text: 'Business Moment Adapter' },
        { key: 'raw-data-log-ingestor', text: 'Raw Data Log Webhook' },
        { key: 'static-site', text: 'Static Site' },
    ];

    function _onChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void {
        setMicroserviceTypeState(option!.key as string);
    }

    return (
        <>
            <Stack tokens={stackTokens}>
                <Stack tokens={stackTokens}>
                    <Text variant="xLarge" block>
                        What type of microservice would you like to create?
                    </Text>
                    <Dropdown placeholder="Select" defaultSelectedKey={microserviceTypeState}
                        options={microserviceTypes}
                        onChange={_onChange}
                    />
                </Stack>


                {microserviceTypeState === 'dolittle-microservice' && (
                    <Stack tokens={stackTokens}>
                        <Base application={_props.application} environment={environment} />
                    </Stack>
                )}

                {microserviceTypeState === 'business-miner' && (
                    <Stack tokens={stackTokens}>
                        <BusinessMomentsAdaptor application={_props.application} environment={environment} />
                    </Stack>
                )}

                {microserviceTypeState === 'raw-data-log-ingestor' && (
                    <Stack tokens={stackTokens}>
                        <RawDataLog application={_props.application} environment={environment} />
                    </Stack>
                )}

                {microserviceTypeState === 'static-site' && (
                    <Stack tokens={stackTokens}>
                        <StaticSite application={_props.application} environment={environment} />
                    </Stack>
                )}

            </Stack>
        </>
    );
};
