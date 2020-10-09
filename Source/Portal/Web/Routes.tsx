import { TopLevelMenu } from 'layouts/top-level-menu';
import { INavLinkGroup, Nav, Pivot, PivotItem } from 'office-ui-fabric-react';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from 'react-router-dom';

import { index as products } from './products';

import './Routes.scss';


const groups: INavLinkGroup[] = [
    {
        name: 'Microservices',
        links: [
            {
                key: 'Harvest',
                name: 'Harvest',
                url: ''
            },
            {
                key: 'Pantry',
                name: 'Pantry',
                url: ''
            }

        ]
    }
];

export const Routes = () => {
    // https://www.benmarshall.me/responsive-iframes/
    const iframe = React.createElement('iframe', {
        src: 'about: blank',
        style: {
            backgroundColor: 'transparent'
        },
        frameBorder: 1,
        allowFullScreen: true
    });


    return (
        <Router>
            <TopLevelMenu />
            <div className="navigation">
                <Nav groups={groups} />
            </div>
            <div className="main-content">
                <div className="iframe-container">
                    {iframe}
                </div>
            </div>
        </Router>
    );
};
