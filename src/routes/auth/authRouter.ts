import Router from "@koa/router";
import { data } from "../../../data/users";

export const authRouter = new Router({
    prefix: '/auth'
});

authRouter.get('/users', (ctx) => {
    ctx.body = data;
})
