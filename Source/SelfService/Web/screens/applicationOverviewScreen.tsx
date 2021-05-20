// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

import { List } from '@fluentui/react/lib/List';
import { Link, Text } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';

import { getApplication, getMicroservices, HttpResponseMicroservices, MicroserviceInfo, HttpResponseApplications2 } from '../api';
import { uriWithAppPrefix } from '../store';

const stackTokens = { childrenGap: 15 };


type Props = {
    application?: HttpResponseApplications2
};


export const ApplicationOverviewScreen: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const { applicationId, environment } = useParams() as any;
    const application = _props.application!;

    const [environments, setEnvironments] = useState([] as string[]);
    const [currentEnvironment, setCurrentEnvironment] = useState(environment);
    const [hasEnvironments, setHasEnvironments] = useState(false);
    const [hasMicroservices, setHasMicroservices] = useState(false);

    const [currentMicroservices, setCurrentMicroservices] = useState([] as MicroserviceInfo[]);


    useEffect(() => {
        // TODO how to get environments from the application
        Promise.all([
            //getApplication(applicationId),
            getMicroservices(applicationId)
        ]
        ).then((values) => {
            //const applicationData = values[0] as HttpResponseApplications2;
            const applicationData = application;

            const microservicesData = values[0] as HttpResponseMicroservices;

            let tempEnvironments = applicationData.environments.map(e => e.name);
            tempEnvironments = [...tempEnvironments, ...microservicesData.microservices.map(item => item.environment)];
            const newEnviornments = [...new Set(tempEnvironments)];
            console.log(newEnviornments.length > 0);
            setHasEnvironments(newEnviornments.length > 0);
            setEnvironments(newEnviornments);

            const microservices = microservicesData.microservices.filter(microservice => microservice.environment === currentEnvironment);
            setHasMicroservices(microservices.length > 0);
            setCurrentMicroservices(microservices);
        });
    }, []);


    const environmentRow = (item?: string, index?: number | undefined): JSX.Element => {
        const environment = item!;
        return (
            <Link underline onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                setCurrentEnvironment(environment);
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
                <Link href={uriWithAppPrefix(`/application/${application?.id}/${currentEnvironment}/microservice/view/${microservice.id}`)} underline>
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
                window.location.href = uriWithAppPrefix(`/application/${application.id}/${currentEnvironment}/container-registry-info`);
            },
        }
    ];

    return (
        <>
            <h3>Application Screen</h3>
            <h1 title={`${application.name} (${application.id})`}>{application.name}</h1>

            <CommandBar items={_items} />

            {!hasEnvironments && (
                <>
                    <PrimaryButton text="Create New Environment" onClick={(e => {
                        window.location.href = uriWithAppPrefix(`/application/${application.id}/environment/create`);
                    })} />
                </>
            )}

            {hasEnvironments && (
                <>
                    <PrimaryButton text="Create New Microservice" onClick={(e => {
                        console.log('Create microservice');
                        window.location.href = uriWithAppPrefix(`/application/${application.id}/${currentEnvironment}/microservice/create`);
                    })} />

                    <h2>Environment</h2>
                    <List items={environments} onRenderCell={environmentRow} />
                </>
            )}


            <h3>Microservices</h3>
            {hasMicroservices
                ? <List items={currentMicroservices} onRenderCell={microserviceRow} />
                : <p>No microservices found</p>
            }
        </>
    );
};
