// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect } from 'react';

export function usePageTitle(title: string): void {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = `${title} - ${prevTitle}`;

        return () => {
            document.title = prevTitle;
        };
    }, []);
};
