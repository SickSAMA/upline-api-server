import { AuthChecker } from 'type-graphql';
import { RequestContext } from '../types/RequestContext';

const authChecker: AuthChecker<RequestContext> = ({ context }) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  return !!context.user;
};

export default authChecker;
