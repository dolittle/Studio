// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {useEffect, useState} from 'react';
import { getConfigFilesNamesList } from '../../api/api';
import { List } from '@fluentui/react/lib/List';
import Typography from '@material-ui/core/Typography';


type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};




export const ConfigFiles: React.FunctionComponent<Props> = (props) => {

    const [filesNamesList, setFilesNamesList] = useState<string[]>([])


    useEffect(() => {
        const fetchConfigFilesNamesList = async () => {
            const result = await getConfigFilesNamesList(props.applicationId, props.environment, props.microserviceId)

            if(!result.data) {
                window.alert(`Could not fetch config files`)
            }

            setFilesNamesList(result.data)
          }

          // call the function
          fetchConfigFilesNamesList()
            // make sure to catch any error
            .catch(console.error);;

    }, []);

    const onRenderCell =  (fileName: string | undefined, index: number | undefined): JSX.Element => {
        return (
            <Typography variant="body1" component="p">{fileName}</Typography>
        );
    };



    return(
    <>
        <Typography variant="h3" component="h3">/app</Typography>
        <Typography variant="h3" component="h3">/data</Typography>
        <List items={filesNamesList} onRenderCell={onRenderCell} />
    </>)
}
