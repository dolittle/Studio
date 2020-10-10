import { TopLevelMenu } from 'layouts/top-level-menu';
import { INavLink, INavLinkGroup, Nav, Pivot, PivotItem } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

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

    useEffect(() => {
        window.document.addEventListener(Navigation.SetStructureEvent, handleSetStructure, false);

        return () => {
            window.document.removeEventListener(Navigation.SetStructureEvent, handleSetStructure);
        }
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
