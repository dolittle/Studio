// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/layout/page';
import { useOnPremiseWizard } from './onPremiseWizardReducer';

import { WizardContextProvider } from './WizardContext';



export const NewConnection = () => {
    const { connectionId } = useParams();
    // const routesElement = useRoutes(routes);
    const [state, dispatch] = useOnPremiseWizard(connectionId || '');

    return (
        <Page title='New M3 Connection'>
            <WizardContextProvider state={state} dispatch={dispatch}>
                {state.steps[state.currentStepIndex].component}
            </WizardContextProvider>
        </Page>
    );
};


