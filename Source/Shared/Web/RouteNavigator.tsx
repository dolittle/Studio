// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// import React, { useEffect, useState } from 'react';
// import { constructor } from '@dolittle/vanir-dependency-inversion';
// import { IMessenger } from './IMessenger';
// import { NavigatedTo } from './NavigatedTo';
// import { Observable } from 'rxjs';
// import { container } from 'tsyringe';
// import { useHistory } from 'react-router-dom';

// let navigatedToObservable: Observable<NavigatedTo> | undefined;

// function getNavigatedToObservable() {
//     if (!navigatedToObservable) {
//         const messenger = container.resolve(IMessenger as constructor<IMessenger>);
//         navigatedToObservable = messenger.observe(NavigatedTo);
//     }

//     return navigatedToObservable;
// }

// export const RouteNavigator = () => {
//     const history = useHistory();
//     const [state, setState] = useState(0);

//     useEffect(() => {
//         const subscription = getNavigatedToObservable().subscribe((msg) => {
//             history.push(msg.path);
//         });

//         return () => subscription.unsubscribe();
//     }, []);

//     return (
//         <></>
//     );
// };
