// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import {
    DocumentCard,
    IContextualMenuItem
} from '@fluentui/react';

import { mergeStyles } from '@fluentui/react/lib/Styling';
import { HttpResponseApplication } from '../api/application';
import { cardStyles, commandTileClass, buttonStyles } from '../theme/viewCard';
import { getLatestBackupLinkByApplication } from '../api/backups';
import { useGlobalContext } from '../stores/notifications';


type Props = {
    application: HttpResponseApplication
    environment: string
};

const conversationTileClass = mergeStyles({ height: 182, paddingLeft: 10 });


export const ViewCard: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const { setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;

    const _items: ICommandBarItemProps[] = [
        {
            buttonStyles,
            key: 'downloadLatest',
            text: 'Download Latest Backup',
            onClick: async (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): Promise<void> => {
                ev!.stopPropagation();
                const url = await getLatestBackupLinkByApplication(_props.application.id, _props.environment);
                window.open(url, '_blank');
            }
        },
        {
            buttonStyles,
            key: 'viewAllBackups',
            text: 'View All Backups',
            onClick: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): void => {
                setCurrentApplicationId(application.id);
                setCurrentEnvironment(environment);
                const href = `/backups/application/${application.id}/${environment}/list`;
                history.push(href);
            }
        }
    ];


    const name = application.name;
    const environmentName = `${environment} - Environment`;

    return (
        <DocumentCard key={`${name}-${environment}`} styles={cardStyles}>
            <div className={conversationTileClass}>
                <h1>{name}</h1>
                <h2>{environmentName}</h2>
                <CommandBar styles={commandTileClass} items={_items} />
            </div>
        </DocumentCard>
    );
};

