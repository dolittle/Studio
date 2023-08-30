// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ContentContainer, ContentHeader, ContentSection, ContentParagraph } from '@dolittle/design-system/wwwroot/Source/DesignSystem';
import React, { } from 'react';

export const ConfigurationContainer = () => {

    return (
        <ContentContainer>
            <ContentHeader
                title='Connector Configuration'
            ></ContentHeader>
            <ContentSection hideHeader>
                <ContentParagraph>
                    You can make changes to the connector and how it functions in this section.
                </ContentParagraph>
            </ContentSection>
        </ContentContainer>
    );
};
