import Router from "@koa/router";
import { data } from "../../../data/users";
import { loginUser } from "../../services/authService";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const authRouter = new Router({
    prefix: '/auth'
});

authRouter.get('/users', authMiddleware, (ctx) => {
    ctx.body = data;
})

authRouter.post('/login', loginUser);