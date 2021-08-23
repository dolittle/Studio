// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { MicroserviceContext } from './MicroserviceContext';
// import { MicroserviceConfiguration } from './MicroserviceConfiguration';
// import { RouteNavigator } from './RouteNavigator';

// export interface BootstrapperProps {
//     microservice: MicroserviceConfiguration;
//     children?: React.ReactNode;
// }

// export const Bootstrapper = (props: BootstrapperProps) => {
//     return (
//         <>
//             <Router>
//                 <MicroserviceContext.Provider value={props.microservice}>
//                     <RouteNavigator />
//                     {props.children}
//                 </MicroserviceContext.Provider>
//             </Router>
//         </>
//     );
// };
