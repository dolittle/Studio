// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { OverviewViewModel } from './OverviewViewModel';
import { DetailsList, DetailsListLayoutMode, IDetailsListProps, ISelectionOptions, Selection } from 'office-ui-fabric-react';

export type OverviewProps = {
    onSelected?: (i) => void;
};

export const Overview = withViewModel<OverviewViewModel, OverviewProps>(OverviewViewModel, ({ viewModel, props }) => {
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
    const selection = new Selection({
        onSelectionChanged: () => {
            console.log(
                'selection changed',
                selection.getSelection(),
            )
        }
    });

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
        selection: selection
    };

    return (
        <>
            <h1>Your Applications</h1>
            <DetailsList {...detailsListProps} />
        </>
    );
});
