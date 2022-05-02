// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {useEffect, useState} from 'react';
import { getConfigFilesNamesList, updateConfigFiles } from '../../api/api';
import { List } from '@fluentui/react/lib/List';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';


type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};




export const ConfigFiles: React.FunctionComponent<Props> = (props) => {

    const [filesNamesList, setFilesNamesList] = useState<string[]>([])


    const fileSelector = document.getElementById('file-selector');

    fileSelector?.addEventListener('change', (event: any) => {
        const fileList = event.target.files;

        if (fileList[0]) {
            var reader = new FileReader();
            reader.readAsText(fileList[0], "UTF-8");
            // reader.readAsDataURL(fileList[0]); USE THIS for images <<< try with  sending always binary
            reader.onload = function (evt:any) {


            }
            reader.onerror = function (evt) {
                console.log("error reading file");
            }
        }
    });
    function formSubmit(event) {

        console.log(new FormData(event.target));

        const upsert = updateConfigFiles(props.applicationId, props.environment, props.microserviceId, {form: new FormData(event.target)})

        event.preventDefault();
    }

    function attachFormSubmitEvent(){
        document?.getElementById("form-file-selector")?.addEventListener("submit", formSubmit);
      }

    attachFormSubmitEvent()


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
            <Typography variant="body1" component="body"
            style={{
                padding: "20px",
                paddingLeft: '50px'
            }}>{fileName}</Typography>
        );
    };



    return(
    <>
        <Typography
            variant="h4"
            component="h4"
            style={{
                paddingBottom: '5px',
            }}>See existing configuration files</Typography>
        <Typography
            variant="body2"
            component="p"
            style={{
                paddingBottom: '20px',
            }}>mounted at /app/data</Typography>
        <List items={filesNamesList} onRenderCell={onRenderCell} />
        <Divider style={{ backgroundColor: '#3B3D48', marginTop: "20px", marginBottom: "20px" }}/>
        <Typography
            variant="h4"
            component="h4"
            style={{
                paddingBottom: '5px',
            }}>Add new configuration files</Typography>
        <form method="put" id="form-file-selector">
            <input type="file" id="file-selector" name='file' />
            <input type="submit" value="Submit"/>
        </form>

    </>)
}
