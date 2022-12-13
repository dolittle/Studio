// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { themeDark } from '@dolittle/design-system';
import { QueryClientProvider } from '@tanstack/react-query';
import { buildQueryClient } from '../api/queryClient';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => buildQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={themeDark}>
                <Component {...pageProps} />
                <CssBaseline />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
