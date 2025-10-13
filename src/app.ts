
import Koa from 'koa';
import Router from '@koa/router';
import { config } from '../config';
import json from 'koa-json';

const app = new Koa();
const router = new Router();

app.use(json());
app.use(router.routes()).use(router.allowedMethods());


router.get('/', async (ctx) => {
    ctx.body = {
        msg: 'Hello'
    };
});


app.listen(config.port, () => {
    console.log('Server is running! ');
});