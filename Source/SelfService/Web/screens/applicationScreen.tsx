// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

import { List } from '@fluentui/react/lib/List';
import { Link, Text } from '@fluentui/react';
import { PrimaryButton, IconButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';

import { getMicroservices, HttpResponseMicroservices, MicroserviceInfo } from '../api';

const stackTokens = { childrenGap: 15 };

export const ApplicationScreen: React.FunctionComponent = () => {
    const { applicationId } = useParams() as any;
    const [data, setData] = useState({
        application: {
            name: '',
            id: ''
        },
        microservices: []
    } as HttpResponseMicroservices);

    const [environments, setEnvironments] = useState([] as string[]);
    const [environment, setEnvironment] = useState('');
    const [hasEnvironments, setHasEnvironments] = useState(false);


    useEffect(() => {
        getMicroservices(applicationId).then(data => {
            setData(data);
            const newEnviornments = [...new Set(data.microservices.map(item => item.environment))];

            setHasEnvironments(newEnviornments.length > 0);
            setEnvironments(newEnviornments);
            return;
        });
    }, []);


    const environmentRow = (item?: string, index?: number | undefined): JSX.Element => {
        const environment = item!;
        return (
            <Link underline onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                setEnvironment(environment);
            }}>
                {environment}
            </Link>
        );
    };

    const microserviceRow = (item?: MicroserviceInfo, index?: number | undefined): JSX.Element => {
        const microservice = item!;

        const items = microservice.images.map(container => {
            return (
                <Stack
                    key={container.name}
                    tokens={stackTokens}
                    horizontal
                >
                    <Text variant="medium" block>
                        {container.name}
                    </Text>

                    <Text variant="medium" block>
                        {container.image}
                    </Text>
                </Stack >
            );
        });


        return (
            <Stack horizontal tokens={stackTokens}>
                <Text>
                    {microservice.name}
                </Text>
                <Link href={`/application/${data.application.id}/microservice/view/${microservice.id}`} underline>
                    view
                </Link>
                <Stack tokens={stackTokens}>
                    {items}
                </Stack>
            </Stack>

        );
    };


    const _items: ICommandBarItemProps[] = [
        {
            key: 'showContainerRegistryInfo',
            text: 'Show Container Registry Info',
            iconProps: { iconName: 'Info' },
            onClick: () => {
                window.location.href = `/application/${data.application.id}/container-registry-info`;
            },
        }
    ];

    return (
        <>
            <h3>Application Screen</h3>
            <h1 title={`${data.application.name} (${data.application.id})`}>{data.application.name}</h1>

            <CommandBar items={_items} />

            {!hasEnvironments && (
                <>
                    <PrimaryButton text="Create New Environment" onClick={(e => {
                        window.location.href = `/application/${data.application.id}/environment/create`;
                    })} />
                </>
            )}
            {hasEnvironments && (
                <>
                    <PrimaryButton text="Create New Microservice" onClick={(e => {
                        console.log('Create microservice');
                        window.location.href = `/application/${data.application.id}/microservice/create`;
                    })} />

                    <h2>Environment</h2>
                    <List items={environments} onRenderCell={environmentRow} />

                    {environment !== '' && (
                        <>
                            <h3>Microservices</h3>
                            <List items={data.microservices
                                .filter(microservice => microservice.environment === environment)}
                                onRenderCell={microserviceRow} />
                        </>
                    )}
                </>
            )}
        </>
    );
};
