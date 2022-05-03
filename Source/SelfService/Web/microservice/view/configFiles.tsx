// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {useEffect, useState} from 'react';
import { deleteConfigFile, getConfigFilesNamesList, updateConfigFiles } from '../../api/api';
import { List } from '@fluentui/react/lib/List';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid, Link } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';



type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    base: {
        '& .MuiTypography-body1': {
            color: 'black',
            align: "center"
        }
    },
})
);



export const ConfigFiles: React.FunctionComponent<Props> = (props) => {

    const [filesNamesList, setFilesNamesList] = useState<string[]>([])
    const classes = useStyles();



    async function formSubmit(event) {
        event.preventDefault();

        console.log(new FormData(event.target));

        const upsert = await updateConfigFiles(props.applicationId, props.environment, props.microserviceId, {form: new FormData(event.target)})

        fetchConfigFilesNamesList()

    }

    attachFormSubmitEvent()

    function attachFormSubmitEvent(){
        document?.getElementById("form-file-selector")?.addEventListener("submit", formSubmit);
    }

    const fetchConfigFilesNamesList = async () => {
        const result = await getConfigFilesNamesList(props.applicationId, props.environment, props.microserviceId)

        if(!result.data) {
            window.alert(`Could not fetch config files`)
        }

        setFilesNamesList(result.data)
      }


    useEffect(() => {
          // call the function
          fetchConfigFilesNamesList()
            // make sure to catch any error
            .catch(console.error);;

    }, []);

    const onRenderCell =  (fileName: string | undefined, index: number | undefined): JSX.Element => {
        return (
            <Grid container spacing={2}>
                 <Grid item
                      className={clsx(classes.base)}>
                    <Typography variant="body1" >{fileName}</Typography>
                </Grid>
                <Grid item  style={{
                        textAlign: "center",
                        paddingBottom: "10px"
                    }}>
                    <Link onClick={() => {
                           if(!fileName) return;
                             deleteConfigFile(props.applicationId, props.environment, props.microserviceId, fileName)
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
