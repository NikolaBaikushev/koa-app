import { Context } from "vm";

export interface ContextState {
    data?: unknown
}
declare module "koa" {
  interface DefaultState extends ContextState {
  }
}