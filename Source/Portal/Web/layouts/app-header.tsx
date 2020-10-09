import * as React from 'react';

import './app-header.scss';

export const AppHeader = () => {
    return (
        <header className="app-header">
            <a href="/" className="site_logo">
                <img src="../images/logo.svg" alt=""/>
            </a>
        </header>
    );
}