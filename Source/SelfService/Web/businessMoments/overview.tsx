// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useSnackbar } from 'notistack';

import { CreateCard, CreateCardAdaptor } from './createCard';

import { useBoolean } from '@fluentui/react-hooks';
import { Modal, DefaultButton } from '@fluentui/react';


import { ViewCard } from './viewCard';
import { HttpResponseApplication } from '../api/api';
import { MicroserviceBusinessMomentAdaptor, HttpResponseBusinessMoments } from '../api/index';
import { withRouteApplicationProps } from '../utils/route';

type Props = {
    environment: string
    application: HttpResponseApplication
    businessMoments: HttpResponseBusinessMoments
    microservices: any[]
};

export const BusinessMomentsOverview: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const _props = props!;
    const application = _props.application;
    const routeApplicationProps = withRouteApplicationProps('business-moments');
    const applicationId = routeApplicationProps.applicationId;
    const environment = _props.environment;

    const $microservices = _props.microservices;
    const $businessMoments = _props.businessMoments;

    const canEdit = application.environments.some(info => info.name === environment && info.automationEnabled);
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);


    const microservicesGit: MicroserviceBusinessMomentAdaptor[] = $microservices.filter(storeItem => {
        if (storeItem.edit === {}) {
            console.error('edit is empty object');
            return false;
        }

        if (!storeItem.edit.kind) {
            //console.error('kind not set issue');
            return false;
        }

        if (storeItem.edit.kind !== 'business-moments-adaptor') {
            return false;
        }
        return true;
    }).map(storeItem => {
        return storeItem.edit;
    });

    const connectors = microservicesGit.map(microservice => {
        return {
            id: microservice.dolittle.microserviceId,
            name: microservice.name,
            connectorType: microservice.extra.connector.kind,
        } as CreateCardAdaptor;
    });

    const moments = $businessMoments.moments.map(bmData => {
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

    return (
        <>
            <h1>Business moments</h1>
            <DefaultButton onClick={() => {
                if (!canEdit) {
                    enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
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
