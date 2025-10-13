
import Koa from 'koa';
import json from 'koa-json';
import { config } from '../config';
import { router } from '../routes/router';

const app = new Koa();

app.use(json());
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT, () => {
    console.log('Server is running! Listening ...');
});