import * as Koa from 'koa';
import * as Router from 'koa-router';

const mqttDatastoreRouter = new Router({
  prefix: '/mqtt',
});

mqttDatastoreRouter.get('/:deviceId', async (ctx: Koa.Context) => {
  const {
    params: { deviceId },
  } = ctx;
  ctx.type = 'json';
  ctx.body = { deviceId };
});

export default mqttDatastoreRouter;
