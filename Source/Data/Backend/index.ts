import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
const swaggerDoc = require('./swagger.json');

(async () => {
    await Host.start({
        swaggerDoc,
        expressCallback: (app) => {
            RegisterRoutes(app);
        }
    });
})();
