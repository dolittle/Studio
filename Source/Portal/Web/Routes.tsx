import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import { index as products } from './products';

export const Routes = () => {
    return (

        <div>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about/42">About</Link>
                            </li>
                            <li>
                                <Link to="/about/43">About 2</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/about/:productId" component={products}>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};
