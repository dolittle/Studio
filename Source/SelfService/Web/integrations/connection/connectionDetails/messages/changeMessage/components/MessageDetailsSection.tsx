// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';


export type MessageDetailsSectionProps = ViewModeProps & {

};

export const MessageDetailsSection = (props: MessageDetailsSectionProps) => {
    return (
        <ContentSection title='Message Details'>
            Name and Description here
        </ContentSection>
    );
};
