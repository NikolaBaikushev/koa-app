import { User } from '../../data/users';

export interface ContextState {
    data?: unknown
    user: Omit<User, 'password'>
}
declare module 'koa' {
  interface DefaultState extends ContextState {
  }
}