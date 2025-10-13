import Router from "@koa/router";
import { data } from "../../../data/users";
import { loginUser } from "../../services/authService";

export const authRouter = new Router({
    prefix: '/auth'
});

authRouter.get('/users', (ctx) => {
    ctx.body = data;
})

authRouter.post('/login', loginUser);