// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import copy from 'copy-to-clipboard';



export const copyToClipboard = (text: string) => {
    copy(text, {
        debug: false,
    });
};
