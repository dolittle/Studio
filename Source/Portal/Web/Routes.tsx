import { Pivot, PivotItem } from 'office-ui-fabric-react';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from 'react-router-dom';

import { index as products } from './products';

const Links = () => {
    const history = useHistory();

    function linkClicked(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        history.push(item?.props.itemKey!);
    }

    return (
        <Pivot onLinkClick={linkClicked}>
            <PivotItem headerText="Home" itemKey="/"></PivotItem>
            <PivotItem headerText="About" itemKey="/about/42"></PivotItem>
            <PivotItem headerText="Other thing" itemKey="/about/43"></PivotItem>
        </Pivot>
    );
};

export const Routes = () => {
    return (
        <Router>
            <Links></Links>
            <Switch>
                <Route path="/about/:productId" component={products}>
                </Route>
            </Switch>
        </Router>
    );
};
