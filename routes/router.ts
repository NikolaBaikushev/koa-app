import Router from "@koa/router";
import {authRouter} from "./auth/authRouter";

// Main router;
export const router = new Router({
    'prefix': '/v1'
});

router.use(authRouter.routes()).use(authRouter.allowedMethods());
