// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ButtonDefaultExample } from './Test';
import { TextFieldControlledExample } from './Input';
export const App = () => {
    return (
        <div
            style={{
                backgroundColor: '#000'
            }}
        >
            <TextFieldControlledExample />
            <ButtonDefaultExample />
        </div>
    );
};
// 3:20
