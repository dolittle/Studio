// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { createContext, useContext } from 'react';
import { WizardAction, WizardState } from './wizardReducer';

export type WizardContextType = {
    dispatch: React.Dispatch<WizardAction>;
    state: WizardState;
};

export const WizardContext = createContext<WizardContextType>({
    dispatch: (value: WizardAction) => { },
    state: {
        connection: {},
        currentStepIndex: 0,
        steps: []
    }
});

export type WizardContextProviderProps = {
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
    children?: React.ReactNode;
};

export const WizardContextProvider = ({ state, dispatch, children }: WizardContextProviderProps) => {
    return (
        <WizardContext.Provider value={{
            dispatch,
            state
        }}>
            {children}
        </WizardContext.Provider>
    );
};

export const useWizardContext = () => useContext(WizardContext);


