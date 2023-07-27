// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useParams } from 'react-router-dom';

export const useConnectionIdFromRoute = () => {
    const { connectionId } = useParams();
    return connectionId;
};
