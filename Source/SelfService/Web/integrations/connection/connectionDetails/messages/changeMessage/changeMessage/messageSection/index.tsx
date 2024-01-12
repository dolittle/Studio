// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { MappedField } from '../../../../../../../apis/integrations/generated';

import { ViewMode } from '../../ViewMode';
import { TableSection } from './tableSection';
import { SubmitButtonSection } from './SubmitButtonSection';
import { MessageFilterSection } from './MessageFilterSection';

export type MessageSectionProps = {
    mode: ViewMode;
    initialSelectedFields: MappedField[];
    selectedTableName: string;
    isSubmitting: boolean;
    onTableSelected: (table: string) => void;
};

export const MessageSection = ({ mode, selectedTableName, initialSelectedFields, isSubmitting, onTableSelected }: MessageSectionProps) => {
    const removeSelectedTable = () => onTableSelected('');

    return (
        <>
            <TableSection
                mode={mode}
                selectedTableName={selectedTableName}
                initialSelectedFields={initialSelectedFields}
                onBackToSearchResultsClicked={() => removeSelectedTable()}
            />

            <MessageFilterSection />

            <SubmitButtonSection mode={mode} isSubmitting={isSubmitting} />
        </>
    );
};
