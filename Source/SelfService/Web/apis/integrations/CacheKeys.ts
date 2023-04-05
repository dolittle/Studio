// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export enum CACHE_KEYS {
    //ConnectionsApi
    Connections_GET = 'connections_get',
    ConnectionsConnectorDeployment_GET = 'connections_connector_deployment_get',

    //ConnectionApi
    Connection_GET = 'connection_get',

    //MessageMappingApi
    ConnectionMessageMappings_GET = 'connection_messages_get',
    ConnectionMessageMapping_GET = 'connection_message_get',

    //MappableTablesApi
    ConnectionMappableTables_GET = 'connection_mappable_tables_get',
    ConnectionMappableTablesSearch_GET = 'connection_mappable_tables_search_get',
    ConnectionMappableTablesTable_GET = 'connection_mappable_tables_table_get',
};
