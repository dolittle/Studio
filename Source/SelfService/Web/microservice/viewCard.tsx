// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    DocumentCard,
    DocumentCardTitle,
    IContextualMenuItem,
    Link
} from '@fluentui/react';
import { cardStyles } from '../theme/viewCard';

import { deleteMicroservice } from '../stores/microservice';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import './microservice.scss';

type Props = {
    microserviceName: string
    microserviceId: string
    microserviceKind: string
    //microservice: MicroserviceInfo
    applicationId: string
    environment: string
    canEdit: boolean
    onAfterDelete: (microserviceId: string, environment: string) => void;
};



const kindTitles = {
    'simple': 'Base default microservice', // TODO this should not be called simple
    'static-site': 'Static files microservice',
    'business-moments-adaptor': 'Business moment adapter microservice',
    'webhook-ingestor': 'Webhook microservice',
};

export const ViewCard: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const microserviceName = _props.microserviceName;
    const microserviceId = _props.microserviceId;
    const microserviceKind = _props.microserviceKind;
    const applicationId = _props.applicationId;
    const environment = _props.environment;
    const canEdit = _props.canEdit;

    const subTitle = kindTitles[microserviceKind] ? kindTitles[microserviceKind] : `Missing Kind title: ${microserviceKind}`;

    const onClickDelete = (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
        ev!.stopPropagation();
        (async () => {
            const success = await deleteMicroservice(applicationId, environment, microserviceId);
            if (!success) {
                alert('Failed to delete');
                return;
            }
            alert('Microservice to deleted');
            _props.onAfterDelete(microserviceId, environment);
        })();
    };

    const onClickView = () => {
        const href = `/application/${applicationId}/${environment}/microservice/view/${microserviceId}`;
        history.push(href);
    };

    return (
        <DocumentCard styles={cardStyles} onClick={onClickView}>
            <div className="microserviceViewCard">
                <DocumentCardTitle
                    title={microserviceName}
                    shouldTruncate
                />
                <DocumentCardTitle
                    title={subTitle}
                    shouldTruncate
                    showAsSecondaryTitle
                />
                <div className="bottomBar">
                    <Link
                        disabled={!canEdit}
                        className="left"
                        onClick={onClickDelete}
                    >Delete</Link>
                    <div className="right">STATUS</div>
                </div>
            </div>
        </DocumentCard >
    );
};

