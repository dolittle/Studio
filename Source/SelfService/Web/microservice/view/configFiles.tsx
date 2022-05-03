// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {useEffect, useState} from 'react';
import { deleteConfigFile, getConfigFilesNamesList, updateConfigFiles } from '../../api/api';
import { List } from '@fluentui/react/lib/List';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid, Link } from '@material-ui/core';


type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};




export const ConfigFiles: React.FunctionComponent<Props> = (props) => {

    const [filesNamesList, setFilesNamesList] = useState<string[]>([])

    function formSubmit(event) {

        console.log(new FormData(event.target));

        const upsert = updateConfigFiles(props.applicationId, props.environment, props.microserviceId, {form: new FormData(event.target)})

        event.preventDefault();
    }

    attachFormSubmitEvent()

    function attachFormSubmitEvent(){
        document?.getElementById("form-file-selector")?.addEventListener("submit", formSubmit);
    }


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
            <Grid container spacing={2}>
                 <Grid item
                    style={{
                        textAlign: "center"
                    }}>
                    <Typography variant="body1" >{fileName}</Typography>
                </Grid>
                <Grid item  style={{
                        textAlign: "center",
                        paddingBottom: "10px"
                    }}>
                    <Link onClick={() => {
                           if(!fileName) return;
                             deleteConfigFile(props.applicationId, props.environment, props.microserviceId, fileName)

                        //    if(!result) {
                        //        window.alert(`Could not fetch delete file`)
                        //    }
                    }}>
                            Remove
                    </Link>
                </Grid>
            </Grid>
        );
    };



    return(
    <>
        <Typography
            variant="h4"
            component="h4"
            style={{
                paddingBottom: '5px',
            }}>Microservice configuration files</Typography>
        <Typography
            variant="body2"
            component="p"
            style={{
                paddingBottom: '20px',
            }}>/app/data</Typography>
        <List items={filesNamesList} onRenderCell={onRenderCell} style={{backgroundColor: "white", width: "30%"}} />
        <Divider style={{ backgroundColor: '#3B3D48', marginTop: "20px", marginBottom: "20px" }}/>
        <Typography
            variant="h4"
            component="h4"
            style={{
                paddingBottom: '5px',
            }}>Add new configuration file</Typography>
        <form method="put" id="form-file-selector">
            <input type="file" id="file-selector" name='file' />
            <input type="submit" value="Submit"/>
        </form>

    </>)
}
