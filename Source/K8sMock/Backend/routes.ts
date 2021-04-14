/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConfigmapsController } from './configmaps/ConfigmapsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeploymentsController } from './deployments/DeploymentsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NamespacesController } from './namespaces/NamespacesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PodsController } from './pods/PodsController';
import { iocContainer } from './../../../node_modules/@dolittle/vanir-backend/dist/tsoa/ioc.js';
import { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "V1ManagedFieldsEntry": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "fieldsType": {"dataType":"string"},
            "fieldsV1": {"dataType":"object"},
            "manager": {"dataType":"string"},
            "operation": {"dataType":"string"},
            "time": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1OwnerReference": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string","required":true},
            "blockOwnerDeletion": {"dataType":"boolean"},
            "controller": {"dataType":"boolean"},
            "kind": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ObjectMeta": {
        "dataType": "refObject",
        "properties": {
            "annotations": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "clusterName": {"dataType":"string"},
            "creationTimestamp": {"dataType":"datetime"},
            "deletionGracePeriodSeconds": {"dataType":"double"},
            "deletionTimestamp": {"dataType":"datetime"},
            "finalizers": {"dataType":"array","array":{"dataType":"string"}},
            "generateName": {"dataType":"string"},
            "generation": {"dataType":"double"},
            "labels": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "managedFields": {"dataType":"array","array":{"ref":"V1ManagedFieldsEntry"}},
            "name": {"dataType":"string"},
            "namespace": {"dataType":"string"},
            "ownerReferences": {"dataType":"array","array":{"ref":"V1OwnerReference"}},
            "resourceVersion": {"dataType":"string"},
            "selfLink": {"dataType":"string"},
            "uid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ConfigMap": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "binaryData": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "immutable": {"dataType":"boolean"},
            "kind": {"dataType":"string"},
            "metadata": {"ref":"V1ObjectMeta"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ListMeta": {
        "dataType": "refObject",
        "properties": {
            "_continue": {"dataType":"string"},
            "remainingItemCount": {"dataType":"double"},
            "resourceVersion": {"dataType":"string"},
            "selfLink": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ConfigMapList": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "items": {"dataType":"array","array":{"ref":"V1ConfigMap"},"required":true},
            "kind": {"dataType":"string"},
            "metadata": {"ref":"V1ListMeta"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1LabelSelectorRequirement": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"string","required":true},
            "operator": {"dataType":"string","required":true},
            "values": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1LabelSelector": {
        "dataType": "refObject",
        "properties": {
            "matchExpressions": {"dataType":"array","array":{"ref":"V1LabelSelectorRequirement"}},
            "matchLabels": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1RollingUpdateDeployment": {
        "dataType": "refObject",
        "properties": {
            "maxSurge": {"dataType":"object"},
            "maxUnavailable": {"dataType":"object"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1DeploymentStrategy": {
        "dataType": "refObject",
        "properties": {
            "rollingUpdate": {"ref":"V1RollingUpdateDeployment"},
            "type": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NodeSelectorRequirement": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"string","required":true},
            "operator": {"dataType":"string","required":true},
            "values": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NodeSelectorTerm": {
        "dataType": "refObject",
        "properties": {
            "matchExpressions": {"dataType":"array","array":{"ref":"V1NodeSelectorRequirement"}},
            "matchFields": {"dataType":"array","array":{"ref":"V1NodeSelectorRequirement"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PreferredSchedulingTerm": {
        "dataType": "refObject",
        "properties": {
            "preference": {"ref":"V1NodeSelectorTerm","required":true},
            "weight": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NodeSelector": {
        "dataType": "refObject",
        "properties": {
            "nodeSelectorTerms": {"dataType":"array","array":{"ref":"V1NodeSelectorTerm"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NodeAffinity": {
        "dataType": "refObject",
        "properties": {
            "preferredDuringSchedulingIgnoredDuringExecution": {"dataType":"array","array":{"ref":"V1PreferredSchedulingTerm"}},
            "requiredDuringSchedulingIgnoredDuringExecution": {"ref":"V1NodeSelector"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodAffinityTerm": {
        "dataType": "refObject",
        "properties": {
            "labelSelector": {"ref":"V1LabelSelector"},
            "namespaces": {"dataType":"array","array":{"dataType":"string"}},
            "topologyKey": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1WeightedPodAffinityTerm": {
        "dataType": "refObject",
        "properties": {
            "podAffinityTerm": {"ref":"V1PodAffinityTerm","required":true},
            "weight": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodAffinity": {
        "dataType": "refObject",
        "properties": {
            "preferredDuringSchedulingIgnoredDuringExecution": {"dataType":"array","array":{"ref":"V1WeightedPodAffinityTerm"}},
            "requiredDuringSchedulingIgnoredDuringExecution": {"dataType":"array","array":{"ref":"V1PodAffinityTerm"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodAntiAffinity": {
        "dataType": "refObject",
        "properties": {
            "preferredDuringSchedulingIgnoredDuringExecution": {"dataType":"array","array":{"ref":"V1WeightedPodAffinityTerm"}},
            "requiredDuringSchedulingIgnoredDuringExecution": {"dataType":"array","array":{"ref":"V1PodAffinityTerm"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Affinity": {
        "dataType": "refObject",
        "properties": {
            "nodeAffinity": {"ref":"V1NodeAffinity"},
            "podAffinity": {"ref":"V1PodAffinity"},
            "podAntiAffinity": {"ref":"V1PodAntiAffinity"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ConfigMapKeySelector": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
            "optional": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ObjectFieldSelector": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "fieldPath": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ResourceFieldSelector": {
        "dataType": "refObject",
        "properties": {
            "containerName": {"dataType":"string"},
            "divisor": {"dataType":"string"},
            "resource": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1SecretKeySelector": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
            "optional": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1EnvVarSource": {
        "dataType": "refObject",
        "properties": {
            "configMapKeyRef": {"ref":"V1ConfigMapKeySelector"},
            "fieldRef": {"ref":"V1ObjectFieldSelector"},
            "resourceFieldRef": {"ref":"V1ResourceFieldSelector"},
            "secretKeyRef": {"ref":"V1SecretKeySelector"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1EnvVar": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "value": {"dataType":"string"},
            "valueFrom": {"ref":"V1EnvVarSource"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ConfigMapEnvSource": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "optional": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1SecretEnvSource": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "optional": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1EnvFromSource": {
        "dataType": "refObject",
        "properties": {
            "configMapRef": {"ref":"V1ConfigMapEnvSource"},
            "prefix": {"dataType":"string"},
            "secretRef": {"ref":"V1SecretEnvSource"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ExecAction": {
        "dataType": "refObject",
        "properties": {
            "command": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1HTTPHeader": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1HTTPGetAction": {
        "dataType": "refObject",
        "properties": {
            "host": {"dataType":"string"},
            "httpHeaders": {"dataType":"array","array":{"ref":"V1HTTPHeader"}},
            "path": {"dataType":"string"},
            "port": {"dataType":"object","required":true},
            "scheme": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1TCPSocketAction": {
        "dataType": "refObject",
        "properties": {
            "host": {"dataType":"string"},
            "port": {"dataType":"object","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Handler": {
        "dataType": "refObject",
        "properties": {
            "exec": {"ref":"V1ExecAction"},
            "httpGet": {"ref":"V1HTTPGetAction"},
            "tcpSocket": {"ref":"V1TCPSocketAction"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Lifecycle": {
        "dataType": "refObject",
        "properties": {
            "postStart": {"ref":"V1Handler"},
            "preStop": {"ref":"V1Handler"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Probe": {
        "dataType": "refObject",
        "properties": {
            "exec": {"ref":"V1ExecAction"},
            "failureThreshold": {"dataType":"double"},
            "httpGet": {"ref":"V1HTTPGetAction"},
            "initialDelaySeconds": {"dataType":"double"},
            "periodSeconds": {"dataType":"double"},
            "successThreshold": {"dataType":"double"},
            "tcpSocket": {"ref":"V1TCPSocketAction"},
            "timeoutSeconds": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ContainerPort": {
        "dataType": "refObject",
        "properties": {
            "containerPort": {"dataType":"double","required":true},
            "hostIP": {"dataType":"string"},
            "hostPort": {"dataType":"double"},
            "name": {"dataType":"string"},
            "protocol": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ResourceRequirements": {
        "dataType": "refObject",
        "properties": {
            "limits": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "requests": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Capabilities": {
        "dataType": "refObject",
        "properties": {
            "add": {"dataType":"array","array":{"dataType":"string"}},
            "drop": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1SELinuxOptions": {
        "dataType": "refObject",
        "properties": {
            "level": {"dataType":"string"},
            "role": {"dataType":"string"},
            "type": {"dataType":"string"},
            "user": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1SeccompProfile": {
        "dataType": "refObject",
        "properties": {
            "localhostProfile": {"dataType":"string"},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1WindowsSecurityContextOptions": {
        "dataType": "refObject",
        "properties": {
            "gmsaCredentialSpec": {"dataType":"string"},
            "gmsaCredentialSpecName": {"dataType":"string"},
            "runAsUserName": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1SecurityContext": {
        "dataType": "refObject",
        "properties": {
            "allowPrivilegeEscalation": {"dataType":"boolean"},
            "capabilities": {"ref":"V1Capabilities"},
            "privileged": {"dataType":"boolean"},
            "procMount": {"dataType":"string"},
            "readOnlyRootFilesystem": {"dataType":"boolean"},
            "runAsGroup": {"dataType":"double"},
            "runAsNonRoot": {"dataType":"boolean"},
            "runAsUser": {"dataType":"double"},
            "seLinuxOptions": {"ref":"V1SELinuxOptions"},
            "seccompProfile": {"ref":"V1SeccompProfile"},
            "windowsOptions": {"ref":"V1WindowsSecurityContextOptions"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1VolumeDevice": {
        "dataType": "refObject",
        "properties": {
            "devicePath": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1VolumeMount": {
        "dataType": "refObject",
        "properties": {
            "mountPath": {"dataType":"string","required":true},
            "mountPropagation": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "readOnly": {"dataType":"boolean"},
            "subPath": {"dataType":"string"},
            "subPathExpr": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Container": {
        "dataType": "refObject",
        "properties": {
            "args": {"dataType":"array","array":{"dataType":"string"}},
            "command": {"dataType":"array","array":{"dataType":"string"}},
            "env": {"dataType":"array","array":{"ref":"V1EnvVar"}},
            "envFrom": {"dataType":"array","array":{"ref":"V1EnvFromSource"}},
            "image": {"dataType":"string"},
            "imagePullPolicy": {"dataType":"string"},
            "lifecycle": {"ref":"V1Lifecycle"},
            "livenessProbe": {"ref":"V1Probe"},
            "name": {"dataType":"string","required":true},
            "ports": {"dataType":"array","array":{"ref":"V1ContainerPort"}},
            "readinessProbe": {"ref":"V1Probe"},
            "resources": {"ref":"V1ResourceRequirements"},
            "securityContext": {"ref":"V1SecurityContext"},
            "startupProbe": {"ref":"V1Probe"},
            "stdin": {"dataType":"boolean"},
            "stdinOnce": {"dataType":"boolean"},
            "terminationMessagePath": {"dataType":"string"},
            "terminationMessagePolicy": {"dataType":"string"},
            "tty": {"dataType":"boolean"},
            "volumeDevices": {"dataType":"array","array":{"ref":"V1VolumeDevice"}},
            "volumeMounts": {"dataType":"array","array":{"ref":"V1VolumeMount"}},
            "workingDir": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodDNSConfigOption": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "value": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodDNSConfig": {
        "dataType": "refObject",
        "properties": {
            "nameservers": {"dataType":"array","array":{"dataType":"string"}},
            "options": {"dataType":"array","array":{"ref":"V1PodDNSConfigOption"}},
            "searches": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1EphemeralContainer": {
        "dataType": "refObject",
        "properties": {
            "args": {"dataType":"array","array":{"dataType":"string"}},
            "command": {"dataType":"array","array":{"dataType":"string"}},
            "env": {"dataType":"array","array":{"ref":"V1EnvVar"}},
            "envFrom": {"dataType":"array","array":{"ref":"V1EnvFromSource"}},
            "image": {"dataType":"string"},
            "imagePullPolicy": {"dataType":"string"},
            "lifecycle": {"ref":"V1Lifecycle"},
            "livenessProbe": {"ref":"V1Probe"},
            "name": {"dataType":"string","required":true},
            "ports": {"dataType":"array","array":{"ref":"V1ContainerPort"}},
            "readinessProbe": {"ref":"V1Probe"},
            "resources": {"ref":"V1ResourceRequirements"},
            "securityContext": {"ref":"V1SecurityContext"},
            "startupProbe": {"ref":"V1Probe"},
            "stdin": {"dataType":"boolean"},
            "stdinOnce": {"dataType":"boolean"},
            "targetContainerName": {"dataType":"string"},
            "terminationMessagePath": {"dataType":"string"},
            "terminationMessagePolicy": {"dataType":"string"},
            "tty": {"dataType":"boolean"},
            "volumeDevices": {"dataType":"array","array":{"ref":"V1VolumeDevice"}},
            "volumeMounts": {"dataType":"array","array":{"ref":"V1VolumeMount"}},
            "workingDir": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1HostAlias": {
        "dataType": "refObject",
        "properties": {
            "hostnames": {"dataType":"array","array":{"dataType":"string"}},
            "ip": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1LocalObjectReference": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodReadinessGate": {
        "dataType": "refObject",
        "properties": {
            "conditionType": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Sysctl": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodSecurityContext": {
        "dataType": "refObject",
        "properties": {
            "fsGroup": {"dataType":"double"},
            "fsGroupChangePolicy": {"dataType":"string"},
            "runAsGroup": {"dataType":"double"},
            "runAsNonRoot": {"dataType":"boolean"},
            "runAsUser": {"dataType":"double"},
            "seLinuxOptions": {"ref":"V1SELinuxOptions"},
            "seccompProfile": {"ref":"V1SeccompProfile"},
            "supplementalGroups": {"dataType":"array","array":{"dataType":"double"}},
            "sysctls": {"dataType":"array","array":{"ref":"V1Sysctl"}},
            "windowsOptions": {"ref":"V1WindowsSecurityContextOptions"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Toleration": {
        "dataType": "refObject",
        "properties": {
            "effect": {"dataType":"string"},
            "key": {"dataType":"string"},
            "operator": {"dataType":"string"},
            "tolerationSeconds": {"dataType":"double"},
            "value": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1TopologySpreadConstraint": {
        "dataType": "refObject",
        "properties": {
            "labelSelector": {"ref":"V1LabelSelector"},
            "maxSkew": {"dataType":"double","required":true},
            "topologyKey": {"dataType":"string","required":true},
            "whenUnsatisfiable": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1AWSElasticBlockStoreVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "partition": {"dataType":"double"},
            "readOnly": {"dataType":"boolean"},
            "volumeID": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1AzureDiskVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "cachingMode": {"dataType":"string"},
            "diskName": {"dataType":"string","required":true},
            "diskURI": {"dataType":"string","required":true},
            "fsType": {"dataType":"string"},
            "kind": {"dataType":"string"},
            "readOnly": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1AzureFileVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "readOnly": {"dataType":"boolean"},
            "secretName": {"dataType":"string","required":true},
            "shareName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1CephFSVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "monitors": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "path": {"dataType":"string"},
            "readOnly": {"dataType":"boolean"},
            "secretFile": {"dataType":"string"},
            "secretRef": {"ref":"V1LocalObjectReference"},
            "user": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1CinderVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "readOnly": {"dataType":"boolean"},
            "secretRef": {"ref":"V1LocalObjectReference"},
            "volumeID": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1KeyToPath": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"string","required":true},
            "mode": {"dataType":"double"},
            "path": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ConfigMapVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "defaultMode": {"dataType":"double"},
            "items": {"dataType":"array","array":{"ref":"V1KeyToPath"}},
            "name": {"dataType":"string"},
            "optional": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1CSIVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "driver": {"dataType":"string","required":true},
            "fsType": {"dataType":"string"},
            "nodePublishSecretRef": {"ref":"V1LocalObjectReference"},
            "readOnly": {"dataType":"boolean"},
            "volumeAttributes": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1DownwardAPIVolumeFile": {
        "dataType": "refObject",
        "properties": {
            "fieldRef": {"ref":"V1ObjectFieldSelector"},
            "mode": {"dataType":"double"},
            "path": {"dataType":"string","required":true},
            "resourceFieldRef": {"ref":"V1ResourceFieldSelector"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1DownwardAPIVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "defaultMode": {"dataType":"double"},
            "items": {"dataType":"array","array":{"ref":"V1DownwardAPIVolumeFile"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1EmptyDirVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "medium": {"dataType":"string"},
            "sizeLimit": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1TypedLocalObjectReference": {
        "dataType": "refObject",
        "properties": {
            "apiGroup": {"dataType":"string"},
            "kind": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PersistentVolumeClaimSpec": {
        "dataType": "refObject",
        "properties": {
            "accessModes": {"dataType":"array","array":{"dataType":"string"}},
            "dataSource": {"ref":"V1TypedLocalObjectReference"},
            "resources": {"ref":"V1ResourceRequirements"},
            "selector": {"ref":"V1LabelSelector"},
            "storageClassName": {"dataType":"string"},
            "volumeMode": {"dataType":"string"},
            "volumeName": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PersistentVolumeClaimTemplate": {
        "dataType": "refObject",
        "properties": {
            "metadata": {"ref":"V1ObjectMeta"},
            "spec": {"ref":"V1PersistentVolumeClaimSpec","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1EphemeralVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "readOnly": {"dataType":"boolean"},
            "volumeClaimTemplate": {"ref":"V1PersistentVolumeClaimTemplate"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1FCVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "lun": {"dataType":"double"},
            "readOnly": {"dataType":"boolean"},
            "targetWWNs": {"dataType":"array","array":{"dataType":"string"}},
            "wwids": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1FlexVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "driver": {"dataType":"string","required":true},
            "fsType": {"dataType":"string"},
            "options": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "readOnly": {"dataType":"boolean"},
            "secretRef": {"ref":"V1LocalObjectReference"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1FlockerVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "datasetName": {"dataType":"string"},
            "datasetUUID": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1GCEPersistentDiskVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "partition": {"dataType":"double"},
            "pdName": {"dataType":"string","required":true},
            "readOnly": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1GitRepoVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "directory": {"dataType":"string"},
            "repository": {"dataType":"string","required":true},
            "revision": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1GlusterfsVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "endpoints": {"dataType":"string","required":true},
            "path": {"dataType":"string","required":true},
            "readOnly": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1HostPathVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "path": {"dataType":"string","required":true},
            "type": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ISCSIVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "chapAuthDiscovery": {"dataType":"boolean"},
            "chapAuthSession": {"dataType":"boolean"},
            "fsType": {"dataType":"string"},
            "initiatorName": {"dataType":"string"},
            "iqn": {"dataType":"string","required":true},
            "iscsiInterface": {"dataType":"string"},
            "lun": {"dataType":"double","required":true},
            "portals": {"dataType":"array","array":{"dataType":"string"}},
            "readOnly": {"dataType":"boolean"},
            "secretRef": {"ref":"V1LocalObjectReference"},
            "targetPortal": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NFSVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "path": {"dataType":"string","required":true},
            "readOnly": {"dataType":"boolean"},
            "server": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PersistentVolumeClaimVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "claimName": {"dataType":"string","required":true},
            "readOnly": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PhotonPersistentDiskVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "pdID": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PortworxVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "readOnly": {"dataType":"boolean"},
            "volumeID": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ConfigMapProjection": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"ref":"V1KeyToPath"}},
            "name": {"dataType":"string"},
            "optional": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1DownwardAPIProjection": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"ref":"V1DownwardAPIVolumeFile"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1SecretProjection": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"ref":"V1KeyToPath"}},
            "name": {"dataType":"string"},
            "optional": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ServiceAccountTokenProjection": {
        "dataType": "refObject",
        "properties": {
            "audience": {"dataType":"string"},
            "expirationSeconds": {"dataType":"double"},
            "path": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1VolumeProjection": {
        "dataType": "refObject",
        "properties": {
            "configMap": {"ref":"V1ConfigMapProjection"},
            "downwardAPI": {"ref":"V1DownwardAPIProjection"},
            "secret": {"ref":"V1SecretProjection"},
            "serviceAccountToken": {"ref":"V1ServiceAccountTokenProjection"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ProjectedVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "defaultMode": {"dataType":"double"},
            "sources": {"dataType":"array","array":{"ref":"V1VolumeProjection"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1QuobyteVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "group": {"dataType":"string"},
            "readOnly": {"dataType":"boolean"},
            "registry": {"dataType":"string","required":true},
            "tenant": {"dataType":"string"},
            "user": {"dataType":"string"},
            "volume": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1RBDVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "image": {"dataType":"string","required":true},
            "keyring": {"dataType":"string"},
            "monitors": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "pool": {"dataType":"string"},
            "readOnly": {"dataType":"boolean"},
            "secretRef": {"ref":"V1LocalObjectReference"},
            "user": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ScaleIOVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "gateway": {"dataType":"string","required":true},
            "protectionDomain": {"dataType":"string"},
            "readOnly": {"dataType":"boolean"},
            "secretRef": {"ref":"V1LocalObjectReference","required":true},
            "sslEnabled": {"dataType":"boolean"},
            "storageMode": {"dataType":"string"},
            "storagePool": {"dataType":"string"},
            "system": {"dataType":"string","required":true},
            "volumeName": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1SecretVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "defaultMode": {"dataType":"double"},
            "items": {"dataType":"array","array":{"ref":"V1KeyToPath"}},
            "optional": {"dataType":"boolean"},
            "secretName": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1StorageOSVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "readOnly": {"dataType":"boolean"},
            "secretRef": {"ref":"V1LocalObjectReference"},
            "volumeName": {"dataType":"string"},
            "volumeNamespace": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1VsphereVirtualDiskVolumeSource": {
        "dataType": "refObject",
        "properties": {
            "fsType": {"dataType":"string"},
            "storagePolicyID": {"dataType":"string"},
            "storagePolicyName": {"dataType":"string"},
            "volumePath": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Volume": {
        "dataType": "refObject",
        "properties": {
            "awsElasticBlockStore": {"ref":"V1AWSElasticBlockStoreVolumeSource"},
            "azureDisk": {"ref":"V1AzureDiskVolumeSource"},
            "azureFile": {"ref":"V1AzureFileVolumeSource"},
            "cephfs": {"ref":"V1CephFSVolumeSource"},
            "cinder": {"ref":"V1CinderVolumeSource"},
            "configMap": {"ref":"V1ConfigMapVolumeSource"},
            "csi": {"ref":"V1CSIVolumeSource"},
            "downwardAPI": {"ref":"V1DownwardAPIVolumeSource"},
            "emptyDir": {"ref":"V1EmptyDirVolumeSource"},
            "ephemeral": {"ref":"V1EphemeralVolumeSource"},
            "fc": {"ref":"V1FCVolumeSource"},
            "flexVolume": {"ref":"V1FlexVolumeSource"},
            "flocker": {"ref":"V1FlockerVolumeSource"},
            "gcePersistentDisk": {"ref":"V1GCEPersistentDiskVolumeSource"},
            "gitRepo": {"ref":"V1GitRepoVolumeSource"},
            "glusterfs": {"ref":"V1GlusterfsVolumeSource"},
            "hostPath": {"ref":"V1HostPathVolumeSource"},
            "iscsi": {"ref":"V1ISCSIVolumeSource"},
            "name": {"dataType":"string","required":true},
            "nfs": {"ref":"V1NFSVolumeSource"},
            "persistentVolumeClaim": {"ref":"V1PersistentVolumeClaimVolumeSource"},
            "photonPersistentDisk": {"ref":"V1PhotonPersistentDiskVolumeSource"},
            "portworxVolume": {"ref":"V1PortworxVolumeSource"},
            "projected": {"ref":"V1ProjectedVolumeSource"},
            "quobyte": {"ref":"V1QuobyteVolumeSource"},
            "rbd": {"ref":"V1RBDVolumeSource"},
            "scaleIO": {"ref":"V1ScaleIOVolumeSource"},
            "secret": {"ref":"V1SecretVolumeSource"},
            "storageos": {"ref":"V1StorageOSVolumeSource"},
            "vsphereVolume": {"ref":"V1VsphereVirtualDiskVolumeSource"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodSpec": {
        "dataType": "refObject",
        "properties": {
            "activeDeadlineSeconds": {"dataType":"double"},
            "affinity": {"ref":"V1Affinity"},
            "automountServiceAccountToken": {"dataType":"boolean"},
            "containers": {"dataType":"array","array":{"ref":"V1Container"},"required":true},
            "dnsConfig": {"ref":"V1PodDNSConfig"},
            "dnsPolicy": {"dataType":"string"},
            "enableServiceLinks": {"dataType":"boolean"},
            "ephemeralContainers": {"dataType":"array","array":{"ref":"V1EphemeralContainer"}},
            "hostAliases": {"dataType":"array","array":{"ref":"V1HostAlias"}},
            "hostIPC": {"dataType":"boolean"},
            "hostNetwork": {"dataType":"boolean"},
            "hostPID": {"dataType":"boolean"},
            "hostname": {"dataType":"string"},
            "imagePullSecrets": {"dataType":"array","array":{"ref":"V1LocalObjectReference"}},
            "initContainers": {"dataType":"array","array":{"ref":"V1Container"}},
            "nodeName": {"dataType":"string"},
            "nodeSelector": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "overhead": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "preemptionPolicy": {"dataType":"string"},
            "priority": {"dataType":"double"},
            "priorityClassName": {"dataType":"string"},
            "readinessGates": {"dataType":"array","array":{"ref":"V1PodReadinessGate"}},
            "restartPolicy": {"dataType":"string"},
            "runtimeClassName": {"dataType":"string"},
            "schedulerName": {"dataType":"string"},
            "securityContext": {"ref":"V1PodSecurityContext"},
            "serviceAccount": {"dataType":"string"},
            "serviceAccountName": {"dataType":"string"},
            "setHostnameAsFQDN": {"dataType":"boolean"},
            "shareProcessNamespace": {"dataType":"boolean"},
            "subdomain": {"dataType":"string"},
            "terminationGracePeriodSeconds": {"dataType":"double"},
            "tolerations": {"dataType":"array","array":{"ref":"V1Toleration"}},
            "topologySpreadConstraints": {"dataType":"array","array":{"ref":"V1TopologySpreadConstraint"}},
            "volumes": {"dataType":"array","array":{"ref":"V1Volume"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodTemplateSpec": {
        "dataType": "refObject",
        "properties": {
            "metadata": {"ref":"V1ObjectMeta"},
            "spec": {"ref":"V1PodSpec"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1DeploymentSpec": {
        "dataType": "refObject",
        "properties": {
            "minReadySeconds": {"dataType":"double"},
            "paused": {"dataType":"boolean"},
            "progressDeadlineSeconds": {"dataType":"double"},
            "replicas": {"dataType":"double"},
            "revisionHistoryLimit": {"dataType":"double"},
            "selector": {"ref":"V1LabelSelector","required":true},
            "strategy": {"ref":"V1DeploymentStrategy"},
            "template": {"ref":"V1PodTemplateSpec","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1DeploymentCondition": {
        "dataType": "refObject",
        "properties": {
            "lastTransitionTime": {"dataType":"datetime"},
            "lastUpdateTime": {"dataType":"datetime"},
            "message": {"dataType":"string"},
            "reason": {"dataType":"string"},
            "status": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1DeploymentStatus": {
        "dataType": "refObject",
        "properties": {
            "availableReplicas": {"dataType":"double"},
            "collisionCount": {"dataType":"double"},
            "conditions": {"dataType":"array","array":{"ref":"V1DeploymentCondition"}},
            "observedGeneration": {"dataType":"double"},
            "readyReplicas": {"dataType":"double"},
            "replicas": {"dataType":"double"},
            "unavailableReplicas": {"dataType":"double"},
            "updatedReplicas": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Deployment": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "kind": {"dataType":"string"},
            "metadata": {"ref":"V1ObjectMeta"},
            "spec": {"ref":"V1DeploymentSpec"},
            "status": {"ref":"V1DeploymentStatus"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1DeploymentList": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "items": {"dataType":"array","array":{"ref":"V1Deployment"},"required":true},
            "kind": {"dataType":"string"},
            "metadata": {"ref":"V1ListMeta"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NamespaceSpec": {
        "dataType": "refObject",
        "properties": {
            "finalizers": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NamespaceCondition": {
        "dataType": "refObject",
        "properties": {
            "lastTransitionTime": {"dataType":"datetime"},
            "message": {"dataType":"string"},
            "reason": {"dataType":"string"},
            "status": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NamespaceStatus": {
        "dataType": "refObject",
        "properties": {
            "conditions": {"dataType":"array","array":{"ref":"V1NamespaceCondition"}},
            "phase": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Namespace": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "kind": {"dataType":"string"},
            "metadata": {"ref":"V1ObjectMeta"},
            "spec": {"ref":"V1NamespaceSpec"},
            "status": {"ref":"V1NamespaceStatus"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1NamespaceList": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "items": {"dataType":"array","array":{"ref":"V1Namespace"},"required":true},
            "kind": {"dataType":"string"},
            "metadata": {"ref":"V1ListMeta"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodCondition": {
        "dataType": "refObject",
        "properties": {
            "lastProbeTime": {"dataType":"datetime"},
            "lastTransitionTime": {"dataType":"datetime"},
            "message": {"dataType":"string"},
            "reason": {"dataType":"string"},
            "status": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ContainerStateRunning": {
        "dataType": "refObject",
        "properties": {
            "startedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ContainerStateTerminated": {
        "dataType": "refObject",
        "properties": {
            "containerID": {"dataType":"string"},
            "exitCode": {"dataType":"double","required":true},
            "finishedAt": {"dataType":"datetime"},
            "message": {"dataType":"string"},
            "reason": {"dataType":"string"},
            "signal": {"dataType":"double"},
            "startedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ContainerStateWaiting": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string"},
            "reason": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ContainerState": {
        "dataType": "refObject",
        "properties": {
            "running": {"ref":"V1ContainerStateRunning"},
            "terminated": {"ref":"V1ContainerStateTerminated"},
            "waiting": {"ref":"V1ContainerStateWaiting"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1ContainerStatus": {
        "dataType": "refObject",
        "properties": {
            "containerID": {"dataType":"string"},
            "image": {"dataType":"string","required":true},
            "imageID": {"dataType":"string","required":true},
            "lastState": {"ref":"V1ContainerState"},
            "name": {"dataType":"string","required":true},
            "ready": {"dataType":"boolean","required":true},
            "restartCount": {"dataType":"double","required":true},
            "started": {"dataType":"boolean"},
            "state": {"ref":"V1ContainerState"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodIP": {
        "dataType": "refObject",
        "properties": {
            "ip": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodStatus": {
        "dataType": "refObject",
        "properties": {
            "conditions": {"dataType":"array","array":{"ref":"V1PodCondition"}},
            "containerStatuses": {"dataType":"array","array":{"ref":"V1ContainerStatus"}},
            "ephemeralContainerStatuses": {"dataType":"array","array":{"ref":"V1ContainerStatus"}},
            "hostIP": {"dataType":"string"},
            "initContainerStatuses": {"dataType":"array","array":{"ref":"V1ContainerStatus"}},
            "message": {"dataType":"string"},
            "nominatedNodeName": {"dataType":"string"},
            "phase": {"dataType":"string"},
            "podIP": {"dataType":"string"},
            "podIPs": {"dataType":"array","array":{"ref":"V1PodIP"}},
            "qosClass": {"dataType":"string"},
            "reason": {"dataType":"string"},
            "startTime": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1Pod": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "kind": {"dataType":"string"},
            "metadata": {"ref":"V1ObjectMeta"},
            "spec": {"ref":"V1PodSpec"},
            "status": {"ref":"V1PodStatus"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "V1PodList": {
        "dataType": "refObject",
        "properties": {
            "apiVersion": {"dataType":"string"},
            "items": {"dataType":"array","array":{"ref":"V1Pod"},"required":true},
            "kind": {"dataType":"string"},
            "metadata": {"ref":"V1ListMeta"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/v1/namespaces/:namespace/configmaps',
            function ConfigmapsController_getConfigmapsForNamespace(request: any, response: any, next: any) {
            const args = {
                    namespace: {"in":"path","name":"namespace","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<ConfigmapsController>(ConfigmapsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getConfigmapsForNamespace.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/namespaces/:namespace/configmaps/:configmap',
            function ConfigmapsController_getConfigmap(request: any, response: any, next: any) {
            const args = {
                    namespace: {"in":"path","name":"namespace","required":true,"dataType":"string"},
                    configmap: {"in":"path","name":"configmap","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<ConfigmapsController>(ConfigmapsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getConfigmap.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/apis/apps/v1/namespaces/:namespace/deployments',
            function DeploymentsController_getDeploymentsForNamespace(request: any, response: any, next: any) {
            const args = {
                    namespace: {"in":"path","name":"namespace","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<DeploymentsController>(DeploymentsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getDeploymentsForNamespace.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/apis/apps/v1/namespaces/:namespace/deployments/:deployment',
            function DeploymentsController_getDeployment(request: any, response: any, next: any) {
            const args = {
                    namespace: {"in":"path","name":"namespace","required":true,"dataType":"string"},
                    deployment: {"in":"path","name":"deployment","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<DeploymentsController>(DeploymentsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getDeployment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/namespaces',
            function NamespacesController_getNamespaces(request: any, response: any, next: any) {
            const args = {
                    watch: {"in":"query","name":"watch","dataType":"boolean"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<NamespacesController>(NamespacesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getNamespaces.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/namespaces/:namespace/pods',
            function PodsController_getPodsForNamespace(request: any, response: any, next: any) {
            const args = {
                    namespace: {"in":"path","name":"namespace","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<PodsController>(PodsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getPodsForNamespace.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/v1/namespaces/:namespace/pods/:pod',
            function PodsController_getPod(request: any, response: any, next: any) {
            const args = {
                    namespace: {"in":"path","name":"namespace","required":true,"dataType":"string"},
                    pod: {"in":"path","name":"pod","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<PodsController>(PodsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getPod.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
