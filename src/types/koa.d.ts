import { Context } from 'vm';

export interface ContextState {
    data?: unknown
    user?: User
}
declare module 'koa' {
  interface DefaultState extends ContextState {
  }
}