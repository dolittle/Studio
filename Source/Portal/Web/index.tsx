import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './Routes';

import './theme';

import './index.scss';

import { AppHeader } from './layouts/app-header';

export default function App() {
    return (
        <>
            <AppHeader></AppHeader>
            <Routes></Routes>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);