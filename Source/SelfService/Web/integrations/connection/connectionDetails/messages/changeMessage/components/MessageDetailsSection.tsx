// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ViewModeProps } from '../ViewMode';
import { CardSection } from './CardSection';


export type MessageDetailsSectionProps = ViewModeProps & {

};

export const MessageDetailsSection = (props: MessageDetailsSectionProps) => {
    return (
        <CardSection title='Message Details'>
            Name and Description here
        </CardSection>
    );
};
