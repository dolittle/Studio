import React from 'react';
import { Layout } from './layouts/Layout';
import { AppHeader } from './layouts/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom';


export default function App() {
    return (
        <Router>
            <AppHeader />
            <Layout />
        </Router>
    );
}
