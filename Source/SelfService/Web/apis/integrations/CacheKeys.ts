// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export enum CACHE_KEYS {
    //CommandsApi
    ConnectionCommands_GET = 'connection_command_get',

    //CommandApi
    ConnectionCommand_GET = 'connection_command_get',

    //ConnectionsApi
    Connections_GET = 'connections_get',
    ConnectionsConnectorDeployment_GET = 'connections_connector_deployment_get',

    //ConnectionApi
    Connection_GET = 'connection_get',

    //ConnectionRestApiApi
    ConnectionRestApiStatus_GET = 'connection_rest_api_status_get',

    //ConnectionRestApiApi
    ConnectionWebhookStatus_GET = 'connection_webhook_status_get',

    //MessageMappingApi
    ConnectionMessageMappings_GET = 'connection_messages_get',
    ConnectionMessageMapping_GET = 'connection_message_get',

    //MappableTablesApi
    ConnectionMappableTables_GET = 'connection_mappable_tables_get',
    ConnectionMappableTablesSearch_GET = 'connection_mappable_tables_search_get',
    ConnectionMappableTablesTable_GET = 'connection_mappable_tables_table_get',

    //ProgramMetadataApi
    ConnectionProgramMetadata_GET = 'connection_program_metadata_get',
    ConnectionProgramMetadataSearch_GET = 'connection_program_metadata_search_get',
    ConnectionProgramMetadataProgram_GET = 'connection_program_metadata_program_get',

    //ServiceAccountsApi
    ConnectionServiceAccounts_GET = 'connection_service_accounts_get',

    //KafkaServiceAccountsApi
    ConnectionKafkaServiceAccounts_GET = 'connection_kafka_service_accounts_get',
    ConnectionKafkaServiceAccountsName_GET = 'connection_kafka_service_accounts_name_get',

    //TableMetadataAssistantApi
    ConnectionTableMetadataAssistant_GET = 'connection_metadata_assistant_get',
};
