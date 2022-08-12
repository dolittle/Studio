// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { themeOptions as darkThemeOptions } from './muiDarkTheme';
import { createTheme } from '@mui/material/styles';

function App() {
  const darkTheme = createTheme(darkThemeOptions);
  return <></>;
}

export default App;
