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
    return (
        <Router>
            <TopLevelMenu/>
            <div className="navigation">
                <Nav groups={groups} />
            </div>
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                    </div>
                    <div className="ms-Grid-col ms-sm4 ms-md5 ms-lg8">
                        <Switch>
                            <Route path="/about/:productId" component={products}>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
};
