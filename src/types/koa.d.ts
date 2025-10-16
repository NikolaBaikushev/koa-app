import { User } from '../schemas/models/userEntitySchema';

export interface ContextState {
    data?: unknown
    user: User
}
declare module 'koa' {
  interface DefaultState extends ContextState {
  }
}