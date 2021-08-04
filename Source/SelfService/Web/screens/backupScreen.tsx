// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams, useHistory } from 'react-router-dom';


import { getApplication, HttpResponseApplications2 } from '../api/api';
import { ViewCard } from '../backup/viewCard';
import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';
import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { withRouteApplicationProps } from '../utils/route';

type Props = {
    application?: HttpResponseApplications2
};

export const BackupScreen: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const routeApplicationProps = withRouteApplicationProps('backups');
    const applicationId = routeApplicationProps.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplication(applicationId),
        ]).then(values => {
            const applicationData = values[0];
            // TODO this should be unique
            // TODO also when we have more than one application and more than one environment we should default to something.
            setApplication(applicationData);
            setLoaded(true);
        });
    }, []);

    //const _props = props!;
    //const application = _props.application!;
    if (!loaded) {
        return null;
    }

    if (application.id === '') {
        return (
            <>
                <h1>Application with this environment not found</h1>
            </>
        );
    }
    const environments = application.environments;
    const nav = getDefaultMenu(history, application.id, '');

    return (
        <>
            <LayoutWithSidebar navigation={nav}>
                <div id="topNavBar" className="nav flex-container">
                    <div className="left flex-start">
                        <BreadCrumbContainer />
                    </div>
                </div>
                <Switch>
                    <Route exact path="/backups/application/:applicationId/overview">
                        <div className="serv">
                            <ul>
                                {environments.map((environment) => {
                                    return <li key={environment.name}>
                                        <ViewCard application={application} environment={environment.name} />
                                    </li>;
                                })}
                            </ul>
                        </div>
                    </Route>
                    <Route exact path="/backups/application/:applicationId/all/:environment">
                        <h1>TODO</h1>
                    </Route>
                    <Route>
                        <h1>Hello</h1>
                    </Route>
                </Switch>
            </LayoutWithSidebar>
        </>
    );
};
