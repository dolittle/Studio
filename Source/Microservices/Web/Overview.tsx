// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { OverviewViewModel } from './OverviewViewModel';
import { DetailsList, DetailsListLayoutMode, IDetailsListProps } from 'office-ui-fabric-react';

export const Overview = withViewModel(OverviewViewModel, ({ viewModel }) => {
    const _columns = [
        {
            key: 'id',
            name: 'Id',
            fieldName: 'applicationId',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
        },
        {
            key: 'name',
            name: 'Name',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
        },
    ];
    const detailsListProps: IDetailsListProps = {
        items: viewModel.items,
        columns: _columns,
        setKey: 'id',
        layoutMode: DetailsListLayoutMode.justified,
        // selection:this._selection,
        selectionPreservedOnEmptyClick: true,
        ariaLabelForSelectionColumn: 'Toggle selection',
        ariaLabelForSelectAllCheckbox: 'Toggle selection for all items',
        checkButtonAriaLabel: 'Row checkbox',
        // onItemInvoked:{this._onItemInvoked},
    };

    return (
        <>
            <h1>Your Microservices</h1>
            <DetailsList {...detailsListProps} />
        </>
    );
});
