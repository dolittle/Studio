// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DataTableToolbar } from '@dolittle/design-system';

import { CardPage } from './components/CardPage';
import { CardSection } from './components/CardSection';
import { CardHeader } from './components/CardHeader';

/**
 * Mode of the view. Should this become overly complex, we can split the logic into multiple views with reusable components
 * @typedef { 'new' | 'edit' } ViewMode
 */
type ViewMode = 'new' | 'edit';

export const ChangeMessageView = () => {
    const location = useLocation();
    const { messageId } = useParams();
    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';


    return (
        <>
            Mode: {mode === 'new' ? 'New message mode' : `Edit message mode for ${messageId}`}
            <CardPage>
                <CardHeader title={mode === 'new' ? 'Create New Message' : 'Edit Message'}/>
                <CardSection title='Message Details'>
                    Name and Description here
                </CardSection>
                <CardSection title='Browse M3 Table names'>
                    Search component here
                </CardSection>
            </CardPage>
        </>
    );
};
