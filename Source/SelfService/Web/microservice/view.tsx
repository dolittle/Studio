// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useReadable } from 'use-svelte-store';

import { getConfigFilesNamesList, getPodStatus, getServerUrlPrefix, HttpResponsePodStatus, InputConfigFile, updateConfigFiles } from '../api/api';
import { microservices, MicroserviceStore } from '../stores/microservice';
import { View as BaseView } from './base/view';
import { View as BusinessMomentsAdaptorView } from './businessMomentsAdaptor/view';
import { View as RawDataLogView } from './rawDataLog/view';
import { View as PurchaseOrderApiView } from './purchaseOrder/view';
import { HttpResponseApplication } from '../api/application';

type Props = {
    application: HttpResponseApplication
    environment: string
    microserviceId: string
};

export const Overview: React.FunctionComponent<Props> = (props) => {
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;


    // Want microservice name
    const [podsData, setPodsData] = useState({
        namespace: '',
        microservice: {
            name: '',
            id: ''
        },
        pods: []
    } as HttpResponsePodStatus);
    const [loaded, setLoaded] = useState(false);
    const currentMicroservice: MicroserviceStore = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }

    const updateConfigMapUrl=()=>`${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment}/microservice/${microserviceId}/config-files/list`


    useEffect(() => {

        Promise.all([
            getPodStatus(applicationId, environment, microserviceId)
        ]).then((values) => {
            setPodsData(values[0]);
            setLoaded(true);
        });

        const fetchData = async () => {

            const result = await getConfigFilesNamesList(applicationId, environment, microserviceId)

            // // consider strngifyign this
            // const input = { name: "my-kingkong-file.json", value: newFile} as InputConfigFile

            // const upsert = await updateConfigFile(applicationId, environment, microserviceId, input)
          }

          // call the function
          fetchData()
            // make sure to catch any error
            .catch(console.error);;

    }, []);
    const fileSelector = document.getElementById('file-selector');

    fileSelector?.addEventListener('change', (event: any) => {
        const fileList = event.target.files;

        console.log(fileList);
        if (fileList[0]) {
            var reader = new FileReader();
            reader.readAsText(fileList[0], "UTF-8");
            // reader.readAsDataURL(fileList[0]); USE THIS for images <<< try with  sending always binary 
            reader.onload = function (evt:any) {
               console.log(evt.target.result);

            }
            reader.onerror = function (evt) {
                console.log("error reading file");
            }
        }
    });
    function formSubmit(event) {

        console.log(new FormData(event.target));

        const upsert = updateConfigFiles(applicationId, environment, microserviceId, {form: new FormData(event.target)})

        event.preventDefault();
    }

    function attachFormSubmitEvent(){
        document?.getElementById("form-file-selector")?.addEventListener("submit", formSubmit);
      }

      attachFormSubmitEvent()

    if (!loaded) {
        return null;
    }

    const subView = whichSubView(currentMicroservice);

    switch (subView) {
        case 'simple':
            return (
                <BaseView application={application} environment={environment} microserviceId={microserviceId} podsData={podsData} />
            );
        case 'business-moments-adaptor':
            return (
                <BusinessMomentsAdaptorView applicationId={applicationId} environment={environment} microserviceId={microserviceId} podsData={podsData} />
            );
        case 'raw-data-log-ingestor':
            return (
                <RawDataLogView applicationId={applicationId} environment={environment} microserviceId={microserviceId} podsData={podsData} />
            );
        case 'purchase-order-api':
            return (
                <PurchaseOrderApiView applicationId={applicationId} environment={environment} microserviceId={microserviceId} podsData={podsData} />
            );
        default:
            return (
                <>
                    <h1>Not supported</h1>
                    <p>This is an error or our part</p>
                    <p>Kind is &quot;{currentMicroservice.kind}&quot;.</p>
                    <p>Subview is &quot;{subView}&quot;.</p>
                    <p>Microservice Id is {currentMicroservice.id}</p>
                </>
            );
    }
};


function whichSubView(currentMicroservice: any): string {
    // Today we try and map subviews based on kind, its not perfect
    let kind = currentMicroservice.kind;
    if (
        currentMicroservice &&
        currentMicroservice.live &&
        currentMicroservice.live.images &&
        currentMicroservice.live.images[0] &&
        currentMicroservice.live.images[0].image &&
        currentMicroservice.live.images[0].image === '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x'
    ) {
        kind = 'raw-data-log-ingestor';
    }

    if (kind === '') {
        kind = 'simple'; // TODO change
    }
    return kind;
}
