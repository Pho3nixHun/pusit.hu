import * as Router from 'koa-router';
import mqttDatastoreRouter from './mqtt-datastore';

const router = new Router();

router.use(mqttDatastoreRouter.routes(), mqttDatastoreRouter.allowedMethods());

export default router;
