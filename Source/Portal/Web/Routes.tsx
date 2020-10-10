import { TopLevelMenu } from 'layouts/top-level-menu';
import { INavLink, INavLinkGroup, Nav, Pivot, PivotItem } from 'office-ui-fabric-react';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from 'react-router-dom';

import { index as products } from './products';

import './Routes.scss';

import { Navigation, NavigationGroup } from '@shared/portal';


export const Routes = () => {
    // https://www.benmarshall.me/responsive-iframes/
    const iframe = React.createElement('iframe', {
        src: '/events',
        style: {
            backgroundColor: 'transparent'
        },
        frameBorder: 1,
        allowFullScreen: true
    });

    const [groups, setGroups] = useState<INavLinkGroup[]>([]);

    function handleSetStructure(e: any) {
        const structure = e.detail as NavigationGroup[];
        setGroups(structure.map(group => {
            return {
                name: group.name,
                links: group.items.map(item => {
                    return {
                        key: item.name,
                        name: item.name,
                        url: ''
                    } as INavLink;
                })
            } as INavLinkGroup;
        }));
    }

    window.document.addEventListener(Navigation.SetStructureEvent, handleSetStructure, false);

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
