import { BaseAPI, Configuration, DefaultConfig, Middleware } from './generated/runtime'


export const BaseAPIFactory = <T extends BaseAPI>(API: new (configuration?: Configuration) => T): T => {
    console.log('inside BaseAPIFactory');
    const configuration = new Configuration({
        basePath: '/api'
    })
    const instance = new API(configuration);
    //FIX: this approach to setting the request middleware doesn't work
    instance.withMiddleware(tenantMiddleware)
    return instance;
}

const tenantMiddleware: Middleware = {
    pre: async (context) => {
        context.init.headers = {'Tenant-ID': readTenantId()};
    }
};

const readTenantId = () => {
    return '29a9b898-a2dc-4565-a143-bce9353c1007';
}