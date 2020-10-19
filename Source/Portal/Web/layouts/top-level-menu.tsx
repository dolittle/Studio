// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react';
import { useHistory } from 'react-router-dom';

import './top-level-menu.scss';
import { withViewModel } from '@shared/mvvm';

export class TopLevelMenuViewModel {

    constructor() {
    }

}

interface ITopLevelMenuProps {
    something: number;
}


class SomethingViewModel {
    constructor() {
        console.log('ViewModel');
    }
}

const Something = withViewModel<SomethingViewModel, ITopLevelMenuProps>(SomethingViewModel, ({ viewModel, props }) => {
    return (
        <div>Something - {props.something}</div>
    );
})


export const TopLevelMenu = withViewModel<TopLevelMenuViewModel, ITopLevelMenuProps>(TopLevelMenuViewModel, ({ viewModel, props }) => {
    const history = useHistory();

    function linkClicked(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        history.push(item?.props.itemKey!);
    }

    return (
        <div className="top-level-menu">
            <div>{props.something}</div>
            <Something something={props.something} />
            <Pivot onLinkClick={linkClicked}>
                <PivotItem headerText="Applications" itemKey="/"></PivotItem>
                <PivotItem headerText="About" itemKey="/about/42"></PivotItem>
                <PivotItem headerText="Other thing" itemKey="/about/43"></PivotItem>
            </Pivot>
        </div>
    );
});