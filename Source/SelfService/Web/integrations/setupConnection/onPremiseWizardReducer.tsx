// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useReducer } from 'react';
import { useConnectionsIdGet } from '../../apis/integrations/connectionsApi.hooks';
import { ConnectionModel, ConnectionStatus } from '../../apis/integrations/generated';

import { ConnectionTypeStep } from './steps/connectionTypeStep';
import { CredentialsStep } from './steps/credentialsStep';
import { FirewallStep } from './steps/firewallStep';
import { ReviewStep } from './steps/reviewStep';
import { SummaryStep } from './steps/summaryStep';
import { ConnectionWizardStep, WizardState, WizardAction, WizardActionKind } from './wizardReducer';


export const onPremiseSteps: ConnectionWizardStep[] = [
    {
        id: 'connection-type',
        component: <ConnectionTypeStep />
    },
    {
        id: 'firewall',
        component: <FirewallStep />
    },
    {
        id: 'credentials',
        component: <CredentialsStep />
    },
    {
        id: 'review',
        component: <ReviewStep />
    },
    {
        id: 'summary',
        component: <SummaryStep />
    },
];

export const resolveStepIndexFromStatus = (steps: ConnectionWizardStep[], status?: ConnectionStatus) => {
    if(!status) {
        throw Error('Could not resolve nest step index from status');
    }
    switch(status.name) {
        case 'Registered':
            return steps.findIndex(s => s.id === 'connection-type');
        case 'Downloaded':
            return steps.findIndex(s => s.id === 'firewall');
        case 'Unconfigured':
            return steps.findIndex(s => s.id === 'firewall');
    }
    return 0;
};



export const onPremiseReducer = (state: WizardState, action: WizardAction) => {
    switch (action.type) {
        case WizardActionKind.Initialize:
            const connection = action.payload as ConnectionModel;
            return {
                ...state,
                connection,
                currentStepIndex: resolveStepIndexFromStatus(state.steps, connection?.status)
            } as WizardState;
            case WizardActionKind.NextStep:
                const nextStepIndex = state.currentStepIndex + 1;
                if(state.steps.length -1 >= nextStepIndex) {
                    return {
                        ...state,
                        currentStepIndex: nextStepIndex
                    };
                }
            break;
            case WizardActionKind.PreviousStep:
                const previousStepIndex = state.currentStepIndex - 1;
                if(previousStepIndex >= 0) {
                    return {
                        ...state,
                        currentStepIndex: previousStepIndex
                    };
                }
            break;
        default:
            throw Error('Unknown action recieved');

    }
    return { ...state };
};


export const useOnPremiseWizard = (connectionId: string) => {
    console.log('useOnPremiseWizard: in hook');
    const { data } = useConnectionsIdGet({ id: connectionId || '' });
    const initialState: WizardState = { steps: onPremiseSteps, currentStepIndex: 0, connection: {} };
    const [state, dispatch] = useReducer(onPremiseReducer, initialState);

    if (data?.value && !state.connection.status) {
        console.log('useOnPremiseWizard: dispatching INITIALIZE');
        dispatch({ type: WizardActionKind.Initialize, payload: data.value });
    }

    return [state, dispatch] as const;
};
