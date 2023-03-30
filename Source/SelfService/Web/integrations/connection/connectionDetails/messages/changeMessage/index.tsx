// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

type ViewMode = 'new' | 'edit';

export const ChangeMessageView = () => {
    const location = useLocation();
    const { messageId } = useParams();
    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';


    return (
        <>{mode === 'new' ? 'New message mode' : `Edit message mode for ${messageId}`}</>
    );
};
