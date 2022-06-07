import React from 'react';
import { Button } from './components/Button/Button';
import { themeOptions as darkThemeOptions } from './muiDarkTheme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

function App() {
  const darkTheme = createTheme(darkThemeOptions)
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <div className="filled">
        <h2>Filled</h2>
        <Button variant='filled' label='primary'/>
        <Button variant='filled' label='secondary' color='secondary'/>
        <Button variant='filled' label='error' color='error'/>
        <Button variant='filled' label='warning' color='warning'/>
        <Button variant='filled' label='info' color='info'/>
        <Button variant='filled' label='success' color='success'/>
      </div>
      <div className="outlined">
        <h2>Outlined</h2>
        <Button variant='outlined' label='primary'/>
        <Button variant='outlined' label='secondary' color='secondary'/>
        <Button variant='outlined' label='error' color='error'/>
        <Button variant='outlined' label='warning' color='warning'/>
        <Button variant='outlined' label='info' color='info'/>
        <Button variant='outlined' label='success' color='success'/>
      </div>
      <div className="text">
        <h2>Text</h2>
        <Button variant='text' label='primary'/>
        <Button variant='text' label='secondary' color='secondary'/>
        <Button variant='text' label='error' color='error'/>
        <Button variant='text' label='warning' color='warning'/>
        <Button variant='text' label='info' color='info'/>
        <Button variant='text' label='success' color='success'/>
      </div>
    </ThemeProvider>
  );
}

export default App;
