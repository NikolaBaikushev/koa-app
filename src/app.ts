
import Koa from 'koa';
import json from 'koa-json';
import { config } from '../config';
import { router } from './routes/router';
import { bodyParser } from '@koa/bodyparser';
import passport from './config/authConfig';
import koaPinoLogger from 'koa-pino-logger';
import logger from './config/logger';

const app = new Koa();

app.use(koaPinoLogger({logger}))
app.use(json());
app.use(bodyParser());
app.use(passport.initialize());
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT, () => {
    console.log('Server is running! Listening ...');
});