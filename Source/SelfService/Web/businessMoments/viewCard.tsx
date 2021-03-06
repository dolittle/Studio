// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import {
    DocumentCard,
    DocumentCardTitle,
    IContextualMenuItem,
    IButtonStyles
} from '@fluentui/react';
import { mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';

import { cardStyles, commandTileClass, buttonStyles as baseButtonStyles } from '../theme/viewCard';
import { deleteBusinessmoment } from '../api/businessmoments';
import { uriWithAppPrefix } from '../store';


const buttonStyles = mergeStyleSets(
    baseButtonStyles,
    {
        root: {
            color: '#ffffff',
            //backgroundColor: 'none'
        }
    }) as IButtonStyles;


type Props = {
    applicationId: string
    momentId: string
    environment: string
    microserviceId: string
    name: string
    microserviceName: string
    connectorType: string
    canEdit: boolean
};

const conversationTileClass = mergeStyles({ height: 182 });

export const ViewCard: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const canEdit = _props.canEdit;
    const applicationId = _props.applicationId;
    const environment = _props.environment;
    const microserviceId = _props.microserviceId;
    const momentId = _props.momentId;
    const name = _props.name;
    const connectorType = _props.connectorType;
    const microserviceName = _props.microserviceName;


    const _items: ICommandBarItemProps[] = [
        {
            buttonStyles,
            key: 'edit',
            text: 'Edit',
            disabled: !canEdit,
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                const href = `/application/${applicationId}/${environment}/business-moments/editor/${momentId}/microservice/${microserviceId}`;
                history.push(href);
            }
        },
        {
            buttonStyles,
            key: 'delete',
            text: 'Delete',
            disabled: !canEdit,
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                (async () => {
                    const success = await deleteBusinessmoment(applicationId, environment, microserviceId, momentId);
                    if (!success) {
                        alert('Failed to remove business moment');
                        return;
                    }
                    const href = `/application/${applicationId}/${environment}/business-moments`;
                    history.push(href);
                })();
            }
        },
        {
            buttonStyles,
            disabled: true,
            key: 'connectorType',
            text: connectorType
        }
    ];


    return (

        <DocumentCard styles={cardStyles}>
            <div className={conversationTileClass}>
                <DocumentCardTitle
                    title={name}
                    shouldTruncate
                />
                <DocumentCardTitle
                    title={microserviceName}
                    shouldTruncate
                    showAsSecondaryTitle
                />
                <CommandBar styles={commandTileClass} items={_items} />
            </div>
        </DocumentCard>
    );
};

