// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageDetailsSection } from '../MessageDetailsSection';
import { MockForm } from './MockForm';

describe('MessageDetailsSection tests', () => {
    it('Should do something', () => {
        render(
            <MockForm>
                <MessageDetailsSection mode='edit' />
            </MockForm>
        );
        expect(screen.getByText('Provide a name for your message type')).toBeInTheDocument();
    });
});

