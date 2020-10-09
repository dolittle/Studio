import React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react';
import { useHistory } from 'react-router-dom';

import './top-level-menu.scss';

export const TopLevelMenu = () => {
    const history = useHistory();

    function linkClicked(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        history.push(item?.props.itemKey!);
    }

    return (
        <div className="top-level-menu">
            <Pivot onLinkClick={linkClicked}>
                <PivotItem headerText="Applications" itemKey="/"></PivotItem>
                <PivotItem headerText="About" itemKey="/about/42"></PivotItem>
                <PivotItem headerText="Other thing" itemKey="/about/43"></PivotItem>
            </Pivot>
        </div>
    );
};