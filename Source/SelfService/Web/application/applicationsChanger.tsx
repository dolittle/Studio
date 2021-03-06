// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ShortInfoWithEnvironment } from '../api/api';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { IDropdownOption } from '@fluentui/react';

type Props = {
    applications: ShortInfoWithEnvironment[]
    current: string
};

export const ApplicationsChanger: React.FunctionComponent<Props> = (props) => {
    const applications = props!.applications;
    const currentApplicationId = props!.current;

    const items = applications.map(application => {
        return {
            key: application.id,
            text: application.name,
        } as IDropdownOption;
    });

    items.push({ key: 'createNew', text: 'Create new' } as IDropdownOption);

    const onChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        const newApplication = option!.key as string;

        if (newApplication === currentApplicationId) {
            return;
        }

        if (newApplication === 'createNew') {
            // TODO I feel there is a better way
            event.stopPropagation();
            alert('TODO: Create application screen');
            return;
        }

        // TODO check if more than 1
        // TODO handle default to change to
        // Key = application/11b6cf47-5d9f-438f-8116-0d9828654657/Dev/

        // TODO change based on the url
        const parts = window.location.pathname.split(`/${currentApplicationId}/`);
        const href = `${parts[0]}/${newApplication}/${parts[1]}`;
        // We use window here, as its a hack to get around the selfservice being duplicated
        window.location.href = href;
    };

    return (
        <Dropdown placeholder="Select"
            dropdownWidth="auto"
            selectedKey={currentApplicationId}
            options={items}
            onChange={onChange}
        />
    );
};
