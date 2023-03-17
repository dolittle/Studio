// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ConnectionModel } from '../../apis/integrations/generated';

export type ConnectionWizardStep = {
    id: string;
    component: React.ReactNode;
};

export type WizardState = {
    steps: ConnectionWizardStep[];
    currentStepIndex: number;
    connection: ConnectionModel;
};

export enum WizardActionKind {
    Initialize = 'initialize',
    NextStep = 'next step',
    PreviousStep = 'previous step',
}

export type WizardAction = {
    type: WizardActionKind;
    payload?: unknown;
};
