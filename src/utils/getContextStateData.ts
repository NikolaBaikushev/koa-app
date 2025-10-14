import { Context } from "koa";

export const getContextStateData = <T>(ctx: Context) => {
    if (!ctx.state?.data) throw new Error('Context doesn\'t have "data"');
    
    return ctx.state.data as T
};
