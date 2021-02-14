import { User } from '../middlewares/jwt';

export interface RequestContext {
  user?: User
}
