// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateCard, CreateCardAdaptor } from './createCard';

import { useBoolean } from '@fluentui/react-hooks';
import { Modal, DefaultButton } from '@fluentui/react';


import { ViewCard } from './viewCard';
import { HttpResponseApplications2, getMicroservices } from '../api/api';
import { getBusinessMoments } from '../api/businessmoments';
import { MicroserviceBusinessMomentAdaptor, HttpResponseBusinessMoments } from '../api/index';

type Props = {
    application: HttpResponseApplications2
};

export const BusinessMomentsOverview: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const { environment, applicationId } = useParams() as any;
    const canEdit = application.environments.some(info => info.name === environment && info.automationEnabled);
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [loaded, setLoaded] = useState(false);
    const [connectors, setConnectors] = useState({} as CreateCardAdaptor[]);
    const [moments, setBusinessMoments] = useState({} as any[]);




    useEffect(() => {
        Promise.all([
            getMicroservices(applicationId),
            getBusinessMoments(applicationId, environment),
        ]
        ).then((values) => {
            const applicationData = application;
            const microservicesGit: MicroserviceBusinessMomentAdaptor[] = applicationData.microservices.filter(microservice => {
                console.log(microservice);
                return microservice.kind === 'business-moments-adaptor';
            });


            const connectors = microservicesGit.map(microservice => {
                return {
                    id: microservice.dolittle.microserviceId,
                    name: microservice.name,
                    connectorType: microservice.extra.connector.kind,
                } as CreateCardAdaptor;
            });


            const microservicesData = values[0] as any;
            // This does not include kind

            const microservicesLive: MicroserviceBusinessMomentAdaptor[] = microservicesData.microservices.filter(microservice => {
                return microservice.kind === 'buisness-moments-adaptor';
            });
            console.log(microservicesLive);


            const businessMomentsData = values[1] as HttpResponseBusinessMoments;

            const moments = businessMomentsData.moments.map(bmData => {
                const tempMs: MicroserviceBusinessMomentAdaptor | undefined = microservicesGit.find(ms => ms.dolittle.microserviceId === bmData.microserviceId);
                const microserviceName = tempMs ? tempMs.name : 'Missing';
                const connectorType = tempMs ? tempMs.extra.connector.kind : 'Missing';
                const moment = bmData.moment;

                return {
                    applicationId,
                    environment,
                    momentId: moment.uuid,
                    name: moment.name,
                    microserviceId: bmData.microserviceId,
                    microserviceName,
                    connectorType,
                    canEdit,
                };
            });
            setBusinessMoments(moments);
            setConnectors(connectors);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <h1>Business moments</h1>
            <DefaultButton onClick={() => {
                if (!canEdit) {
                    alert('Automation is disabled');
                    return;
                }
                showModal();
            }} text="Create Business Moment" />
            <div className="serv">
                <ul>
                    {moments.map((moment) => {
                        return <li key={moment.momentId}><ViewCard {...moment} /></li>;
                    })}
                </ul>
            </div>
            <Modal
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isBlocking={false}
            >
                <CreateCard applicationId={applicationId} environment={environment} adaptors={connectors} onCancel={() => {
                    hideModal();
                }} />
            </Modal>
        </>
    );
};
