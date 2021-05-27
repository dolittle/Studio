// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ShortInfo } from '../api/api';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { IDropdownOption } from '@fluentui/react';

const stackTokens = { childrenGap: 15 };


type Props = {
    applications: ShortInfo[]
    current: string
};

export const ApplicationsChanger: React.FunctionComponent<Props> = (props) => {
    const applications = props!.applications;
    const currentApplicationId = props!.current;

    const items = applications.map(application => {
        return { key: application.id, text: application.name } as IDropdownOption;
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

        alert('TODO: Change to application screen');
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
