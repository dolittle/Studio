// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {
    useState,
    useEffect
} from 'react';
import { useHistory } from 'react-router-dom';
import { List } from '@fluentui/react/lib/List';
import { Link } from '@fluentui/react';
import { useSnackbar } from 'notistack';

import {
    ShortInfoWithEnvironment
} from '../api/api';

import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { LayoutWithSidebar } from '../layout/layoutWithSidebar';
import { useGlobalContext } from '../stores/notifications';
import { ButtonText } from '../theme/buttonText';
import { HttpResponseApplications, getApplications } from '../api/application';

export const ApplicationsScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState({
        id: '',
        name: '',
        applications: []
    } as HttpResponseApplications);
    const [loaded, setLoaded] = useState(false);
    const { setCurrentEnvironment } = useGlobalContext();

    // TODO handle when not 200!
    useEffect(() => {
        Promise.all([
            getApplications(),
        ]).then(values => {
            const data = values[0] as HttpResponseApplications;

            // TODO bring this back maybe with a query string option
            //if (data.applications.length === 1) {
            //    const application = data.applications[0];
            //    setCurrentEnvironment(application.environment);
            //    window.location.href = uriWithAppPrefix(`/microservices/application/${application.id}/${application.environment}/overview`);
            //    return;
            //}
            setData(data);

            setLoaded(true);
        }).catch((error) => {
            console.log(error);
            enqueueSnackbar('Failed getting data from the server', { variant: 'error' });
        });
    }, []);


    if (!loaded) {
        return null;
    }

    const onRenderCell = (item?: ShortInfoWithEnvironment, index?: number | undefined): JSX.Element => {
        const application = item!;
        return (
            <Link onClick={() => {
                setCurrentEnvironment(application.environment);
                const href = `/microservices/application/${application.id}/${application.environment}/overview`;
                history.push(href);
            }}
                underline>
                {application.name.toUpperCase()} - {application.environment}
            </Link>
        );
    };

    return (
        <>
            <LayoutWithSidebar navigation={[]}>
                <div id="topNavBar" className="nav flex-container">
                    <div className="left flex-start">
                        <BreadCrumbContainer routes={[]} />
                    </div>
                </div>

                <h1>Applications Screen</h1>

                <ButtonText withIcon={true} onClick={() => {
                    const href = '/application/create';
                    history.push(href);

                }}>Create new Application</ButtonText>

                <List items={data.applications} onRenderCell={onRenderCell} />
            </LayoutWithSidebar >
        </>
    );
};
