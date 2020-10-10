import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import '@shared/styles/theme';

import './index.scss';


export default function App() {
    alert('hello');
    return (
        <>
            Hello world
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);